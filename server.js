import Replicate from "replicate";
import secrets from "./constants.js";

const replicate = new Replicate({
  auth: secrets.apiKey,
});

// starter conversation

const message1 = {};
message1["user"] = "hey good morning!";
message1[secrets.role] =
  "good morning! I had some batata for my breakfast, what about you?";

const message2 = {};
message2["user"] =
  "Sounds nice! batata is a delicious and nutritious root vegetable that is rich in vitamins, minerals, and antioxidants, I had apples for my breakfast!";
message2[secrets.role] = "delicious!";

const conversation = [];
conversation.push(message1);
conversation.push(message2);

// push the prompt to the conversation
conversation.push({
  user: "what was my breakfast and do you love it ?",
});

// prompt to the LLAMA2 model using the replicate client
const output = await replicate.run(
  "meta/llama-2-70b-chat:2c1608e18606fad2812020dc541930f2d0495ce32eee50074220b87300bc16e1",
  {
    input: {
      prompt: `Hello you're ${
        secrets.role
      }, here is the conversation as a json data, read the full conversation and respod to the last message \n conversation: ${JSON.stringify(
        conversation
      )}`,
    },
  }
);

// cut the reponse for the message from the full output response
const response = output.join("").substring(/".*?"/.exec()[0].length - 1);
// add it to the conversation
conversation.at(-1)[secrets.role] = response;
// log the response
console.log(response);
