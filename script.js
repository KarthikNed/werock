const questions = [
    "🎬 What's your favorite movie?",
    "🎨 What inspired you to draw?",
    "💃 Why did you learn to dance?"
  ];
  
  let currentQuestion = 0;
  const answers = [];
  
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const nextBtn = document.getElementById("next-btn");
  
  // Load open-ended questions
  function loadQuestion() {
    questionEl.textContent = questions[currentQuestion];
    optionsEl.innerHTML = "";
  
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Your answer...";
    input.id = "answerInput";
    optionsEl.appendChild(input);
  }
  
  // Handle "Next" button
  nextBtn.onclick = () => {
    const input = document.getElementById("answerInput");
    if (!input || input.value.trim() === "") {
      alert("Please write something!");
      return;
    }
  
    answers.push(input.value.trim());
    currentQuestion++;
  
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showFinalScreen();
    }
  };
  
  // Final proposal question
  function showFinalScreen() {
    questionEl.textContent = "Will you go out with me? 💖";
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";
  
    const yesBtn = document.createElement("button");
    yesBtn.textContent = "ya :)";
    yesBtn.onclick = () => {
      sendResponse("ya :)");
      questionEl.textContent = "YAY!! 🎉 You just made my day 💕";
      optionsEl.innerHTML = "";
      launchConfetti();
    };
  
    const noBtn = document.createElement("button");
    noBtn.textContent = "sorry";
    noBtn.onclick = () => {
      sendResponse("sorry");
      questionEl.textContent = "Aww... okay 😢 I still think you're amazing 💌";
      optionsEl.innerHTML = "";
    };
  
    optionsEl.appendChild(yesBtn);
    optionsEl.appendChild(noBtn);
  }
  
  // Confetti on acceptance
  function launchConfetti() {
    let duration = 3 * 1000;
    let end = Date.now() + duration;
  
    (function frame() {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
  
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
  
  // Send to Discord webhook
  function sendResponse(finalAnswer) {
    const data = {
      content: "🎀 A new response just came in!",
      embeds: [
        {
          title: "Proposal Quiz Responses 💖",
          fields: [
            { name: "1. Favorite Movie 🎬", value: answers[0] || "N/A" },
            { name: "2. What inspired you to draw? 🎨", value: answers[1] || "N/A" },
            { name: "3. Why did you learn to dance? 💃", value: answers[2] || "N/A" },
            { name: "Final Answer 💌", value: finalAnswer }
          ],
          color: 0xff80ab
        }
      ]
    };
  
    fetch("https://discord.com/api/webhooks/1363568928890032249/MSChy-Fp-q8ijgZwy8Edib5KzQCoTL-oNPLDu8Ajw_S1A_ncYA4vGsYvNhDle0F4y7w9", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(() => {
      console.log("Sent to Discord webhook!");
    })
    .catch(err => {
      console.error("Failed to send:", err);
    });
  }
  
  // Start quiz
  loadQuestion();
  
  