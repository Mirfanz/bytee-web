import mqtt from "mqtt";

const mqttClient = mqtt.connect({
  hostname: "free.mqtt.iyoti.id",
  port: 1883,
  //   hostname: "c128aa8bbd744fc8bd058dfceb7135a3.s2.eu.hivemq.cloud",
  //   port: 8883,
  //   protocol: "mqtts",
  //   username: "Sambo",
  //   password: "SamboBadas123",
});

console.log("Connection");
mqttClient.on("connect", function () {
  console.log("Connected to MQTT");
});

mqttClient.on("message", (topic, payload, packet) => {
  console.log(topic, payload.toString());
});

mqttClient.on("disconnect", () => {
  console.log("Disconnect from MQTT");
});

export default mqttClient;
