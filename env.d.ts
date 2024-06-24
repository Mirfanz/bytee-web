declare namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRET: string;
    DATABASE_URL: string;
    DIRECT_URL: string;
    BREVO_APIKEY: string;
    NEXT_PUBLIC_VERIFICATION_DELAY: number;
    NEXT_PUBLIC_HOST: string;
    NEXT_PUBLIC_MQTT_HOST: string;
    NEXT_PUBLIC_MQTT_PORT: number;
  }
}
