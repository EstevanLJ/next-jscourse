import Link from "next/link";
import { useRouter } from "next/router";
import { getAllFeedbacks } from "../data/feedbackUtils";

function FeedbacksPage(props) {
  const { feedbacks } = props;
  const router = useRouter();

  function formattedDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  function handleDelete(feedback) {
    if (!confirm("Are you sure?")) {
      return;
    }

    fetch("/api/feedback/1", {
      method: "DELETE",
      body: JSON.stringify({ id: feedback.id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        if (data.success) {
          router.reload();
        }
      });
  }

  return (
    <div>
      <h1>Feedbacks</h1>

      {feedbacks.map((feedback, index) => (
        <div
          key={index}
          style={{ marginBottom: "2rem", borderTop: "1px solid #ddd" }}
        >
          <div>
            <span>From: {feedback.email}</span>
            <a
              style={{ float: "right" }}
              href="#"
              // onClick={() => handleDelete(feedback)}
              onClick={handleDelete.bind(null, feedback)}
            >
              Delete
            </a>
          </div>
          <div>At: {formattedDate(feedback.id)}</div>
          <div>Feedback: {feedback.text}</div>
        </div>
      ))}

      <Link href="/">Back</Link>
    </div>
  );
}

export default FeedbacksPage;

export function getServerSideProps() {
  const feedbacks = getAllFeedbacks();
  return {
    props: {
      feedbacks,
    },
  };
}
