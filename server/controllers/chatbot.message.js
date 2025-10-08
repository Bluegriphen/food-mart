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

    // Bot responses
    const botResponses = {
      exact: {
        hello: "Hi there! Welcome to FoodMart. How can I help you today?",
        hi: "Hello! How can I assist you with your food order today?",
        hey: "Hey! Looking for something delicious? 🍔🍕",
        menu: "You can view our full menu on the 'Menu' tab or by clicking here: [link to menu]. What are you craving?",
      },
      keywords: {
        // Keywords are lowercase
        delivery:
          "Delivery usually takes 30-45 minutes. Please ensure your address is correct!",
        order:
          "To place an order, tell me what item you'd like and the quantity, or head to the 'Order' page.",
        payment:
          "We accept credit/debit cards, PayPal, and cash on delivery. Which method works for you?",
        hours: "FoodMart is open from 10 AM to 10 PM, seven days a week.",
        contact:
          "For immediate assistance, please call us at (555) 123-4567 or email support@foodmart.com.",
        cancellation:
          "You can cancel an order within 5 minutes of placing it by calling customer service.",
      },
      // 3. Default Fallback
      default:
        "Sorry, I didn’t understand that. Can you please rephrase or ask something else? Try asking about 'menu', 'delivery', or 'payment'.",
    };

    const normalizedText = text.toLowerCase().trim();

    // Pick bot response
    const botText =
      botResponses[normalizedText] ||
      "Sorry, I didn’t understand that. Can you please rephrase or ask something else?";

    // Save bot response
    const bot = await Bot.create({
      text: botText,
    });

    // Return both messages
    return res.status(200).json({
      userMessage: user.text,
      botMessage: bot.text,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
