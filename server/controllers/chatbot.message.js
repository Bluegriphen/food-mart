import Bot from "../models/bot.model.js";
import User from "../models/user.model.js";

export const Message = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text?.trim()) {
      return res.status(400).send({ message: "Text is required" });
    }

    // Save user message
    const user = await User.create({
      sender: "user",
      text,
    });

    const botResponses = {
      exact: {
        hello: "Hi there! Welcome to FoodMart. How can I help you today?",
        hi: "Hello! How can I assist you with your food order today?",
        hey: "Hey! Looking for something delicious?",
        menu:
          "You can view our full menu on the Menu tab. What are you craving?",
      },

      keywords: {
        delivery:
          "Delivery usually takes 30-45 minutes. Please ensure your address is correct!",
        order:
          "To place an order, tell me what item you'd like and the quantity.",
        payment:
          "We accept cards and cash on delivery. Which method works for you?",
        hours: "FoodMart is open from 10 AM to 10 PM.",
        contact:
          "Call us at (555) 123-4567 or email support@foodmart.com.",
        cancellation:
          "Orders can be cancelled within 5 minutes of placing.",
      },

      default:
        "I'm here to help with menu, food orders, delivery, and payments. What would you like to eat today?",
    };

    const normalizedText = text.toLowerCase().trim();

    let botText = botResponses.default;
    let matched = false;

    // Exact match
    if (botResponses.exact[normalizedText]) {
      botText = botResponses.exact[normalizedText];
      matched = true;
    } else {
      // Keyword match
      for (const key in botResponses.keywords) {
        if (normalizedText.includes(key)) {
          botText = botResponses.keywords[key];
          matched = true;
          break;
        }
      }
    }

    /* ---------- Smart Food Understanding ---------- */

    if (
      normalizedText.includes("best food") ||
      normalizedText.includes("recommend") ||
      normalizedText.includes("suggest")
    ) {
      botText =
        "Our most popular items are Pizza, Burger, Pasta, and Cold Drinks. What would you like?";
      matched = true;
    }

    if (normalizedText.includes("hungry")) {
      botText =
        "You sound hungry! I recommend Pizza or Burger. What would you like to order?";
      matched = true;
    }

    if (normalizedText.includes("pizza")) {
      botText =
        "Pizza is very popular! Would you like Margherita, Farmhouse, or Pepperoni?";
      matched = true;
    }

    if (normalizedText.includes("burger")) {
      botText =
        "We have Veg Burger, Cheese Burger, and Double Patty Burger. Which one do you want?";
      matched = true;
    }

    if (
      normalizedText.includes("coke") ||
      normalizedText.includes("cola") ||
      normalizedText.includes("drink")
    ) {
      botText =
        "We have Coca-Cola, Pepsi, and other cold drinks. Would you like to add one?";
      matched = true;
    }

    if (normalizedText.includes("thank")) {
      botText = "You're welcome! Happy to help.";
      matched = true;
    }

    if (normalizedText.includes("what can you do")) {
      botText =
        "I can help you choose food, place orders, and answer delivery or payment questions.";
      matched = true;
    }

    // Save bot response
    const bot = await Bot.create({
      text: botText,
    });

    return res.status(200).json({
      userMessage: user.text,
      botMessage: bot.text,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
