import React, { createContext, useContext, useEffect, useState } from "react";
import { createOrUpdateUser } from "@/services/api";

export interface TelegramUser {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;
}

interface TelegramContextType {
  user: TelegramUser | null;
  isReady: boolean;
  isTelegramEnvironment: boolean;
  isDevelopmentMock: boolean;
}

const TelegramContext = createContext<TelegramContextType>({
  user: null,
  isReady: false,
  isTelegramEnvironment: false,
  isDevelopmentMock: false,
});

export const useTelegram = () => {
  const context = useContext(TelegramContext);
  if (!context) {
    throw new Error("useTelegram must be used within TelegramProvider");
  }
  return context;
};

export const TelegramProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isTelegramEnvironment, setIsTelegramEnvironment] = useState(false);
  const [isDevelopmentMock, setIsDevelopmentMock] = useState(false);

  useEffect(() => {
    const initTelegram = async () => {
      // Check if we're in Telegram Web App environment
      if (typeof window !== "undefined" && window.Telegram?.WebApp) {
        setIsTelegramEnvironment(true);
        setIsDevelopmentMock(false);
        const webApp = window.Telegram.WebApp;

        // Expand the app to full screen
        webApp.expand?.();

        // Get user data
        const initData = webApp.initData;
        console.log("Telegram Init Data:", initData);

        if (webApp.initDataUnsafe?.user) {
          const telegramUser = webApp.initDataUnsafe.user;
          const userData: TelegramUser = {
            id: telegramUser.id,
            firstName: telegramUser.first_name,
            lastName: telegramUser.last_name,
            username: telegramUser.username,
            photoUrl: telegramUser.photo_url,
          };

          setUser(userData);

          // Sync to Firestore
          try {
            await createOrUpdateUser(userData.id, {
              firstName: userData.firstName,
              lastName: userData.lastName,
              username: userData.username,
              photoUrl: userData.photoUrl,
            });
            console.log("User synced to Firestore");
          } catch (error) {
            console.error("Error syncing user to Firestore:", error);
          }
        }

        setIsReady(true);
      } else if (__DEV__) {
        // Fallback for non-Telegram environments (development)
        console.warn("Not in Telegram Web App environment");
        setIsTelegramEnvironment(false);
        setIsDevelopmentMock(true);
        const mockUser: TelegramUser = {
          id: 123456789,
          firstName: "GTR",
          lastName: "Student",
          username: "gtrstudent",
          photoUrl: undefined,
        };

        setUser(mockUser);

        // Sync mock user to Firestore for testing
        try {
          await createOrUpdateUser(mockUser.id, {
            firstName: mockUser.firstName,
            lastName: mockUser.lastName,
            username: mockUser.username,
          });
          console.log("Mock user synced to Firestore");
        } catch (error) {
          console.error("Error syncing mock user:", error);
        }

        setIsReady(true);
      } else {
        console.warn("Telegram Web App environment unavailable");
        setIsTelegramEnvironment(false);
        setIsDevelopmentMock(false);
        setUser(null);
        setIsReady(true);
      }
    };

    initTelegram();
  }, []);

  return (
    <TelegramContext.Provider
      value={{ user, isReady, isTelegramEnvironment, isDevelopmentMock }}
    >
      {children}
    </TelegramContext.Provider>
  );
};

// Declare Telegram Web App types
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        expand?: () => void;
        close?: () => void;
        initData: string;
        initDataUnsafe?: {
          user?: {
            id: number;
            is_bot: boolean;
            first_name: string;
            last_name?: string;
            username?: string;
            photo_url?: string;
            language_code?: string;
          };
        };
      };
    };
  }
}
