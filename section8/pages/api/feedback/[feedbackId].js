import { removeFeedback } from "../../../data/feedbackUtils";

function handler(req, res) {
  // const id = req.query.feedbackId;
  const id = req.body.id;

  if (req.method === "DELETE") {
    removeFeedback(id);

    res.status(200).json({
      success: true,
      message: "Feedback successfully deleted!",
    });
  }

  res.status(404).send();
}

export default handler;
