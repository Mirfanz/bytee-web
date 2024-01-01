"use server";

import mqttClient from "./utils/mqtt";

export const Publish = async (topic: string, status: boolean) => {
  mqttClient.publish(topic, status ? "1" : "0");
};

export const Subscribe = async (...topic: string[]) => {
  console.log("topic", topic);
};
