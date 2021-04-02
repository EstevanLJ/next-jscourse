import {
  getAllFeedbacks,
  addFeedback,
} from "../../../data/feedbackUtils";

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const text = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: text,
    };

    addFeedback(newFeedback);

    res.status(201).json({
      message: "Success!",
      feedback: newFeedback,
    });
  } else {
    const feedbacks = getAllFeedbacks();

    res.status(200).json({
      feedbacks: feedbacks,
    });
  }
}

export default handler;
