import React, { useState } from "react";
import ChatBot from "react-chatbotify";


const PrintXcelerateChatbot = () => {
  const [form, setForm] = useState({});

  const flow = {
    start: {
      message: "Welcome to PrintXcelerate! How can I help you today?",
      options: ["I'm looking for products", "I want information", "Other"],
      function: (params) => setForm({ ...form, firstAnswer: params.userInput }),
      path: "ask_interest",
    },
    ask_interest: {
      message: (params) =>
        params.userInput === "I'm looking for products"
          ? "What kind of products are you interested in? If you cannot write, please send us an email at printxcelerate@gmail.com"
          : params.userInput === "I want information"
          ? "What information would you like to know? If you cannot write, please send us an email at printxcelerate@gmail.com"
          : "Please tell me more.",
      options:
        form.firstAnswer === "I'm looking for products"
          ? ["Prints", "Designs", "Offers"]
          : form.firstAnswer === "I want information. If you cannot write, please send us an email at printxcelerate@gmail.com"
          ? ["Opening hours", "Shipping", "Returns"]
          : null,
      chatDisabled: form.firstAnswer !== "Other",
      function: (params) => setForm({ ...form, interest: params.userInput }),
      path: "ask_email",
    },
    ask_email: {
      message: "Could you please provide your email so we can send you offers and updates? If you cannot write, please send us an email at printxcelerate@gmail.com",
      function: (params) => setForm({ ...form, email: params.userInput }),
      path: "end",
    },
    end: {
      message: (
        <div>
          Thank you for your interest! <br />
          First choice: {form.firstAnswer} <br />
          Selection: {form.interest} <br />
          Email: {form.email} <br />
          We will get back to you shortly.
        </div>
      ),
      options: ["New Question. If you cannot write, please send us an email at printxcelerate@gmail.com"],
      chatDisabled: false,
      path: "start",
    },
  };

  return (
    <div style={{ maxWidth: 350, margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <ChatBot
        settings={{ general: { embedded: false }, chatHistory: { storageKey: "printxcelerate_chat" } }}
        flow={flow}
      />
    </div>
  );
};

export default PrintXcelerateChatbot;
