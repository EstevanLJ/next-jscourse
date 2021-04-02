import { useRef } from "react";
import Link from "next/link";

function HomePage() {
  const emailRef = useRef();
  const feedbackRef = useRef();

  function submitHandler(ev) {
    ev.preventDefault();

    let email = emailRef.current.value;
    let feedback = feedbackRef.current.value;

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        text: feedback,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        emailRef.current.value = "";
        feedbackRef.current.value = "";
        alert(data.message);
      });
  }

  return (
    <div>
      <h1>The Home Page</h1>

      <form onSubmit={submitHandler}>
        <div>
          <div>
            <label htmlFor="email">Your E-mail Address</label>
          </div>
          <input id="email" type="email" ref={emailRef} />
        </div>
        <div>
          <div>
            <label htmlFor="feedback">Your Feedback</label>
          </div>
          <textarea id="feedback" rows="5" ref={feedbackRef}></textarea>
        </div>
        <button>Submit</button>
      </form>

      <Link href="/feedbacks">Read the feedbacks</Link>
    </div>
  );
}

export default HomePage;
