// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// error message toggles
let errorModal =  document.getElementById("modal");

function hideError() {
    errorModal.className = "hidden";
};

function showErrorModal() {
    errorModal.className = "show";
};

// Hide error-modal on load
hideError();

// get posts to iterate over for likes
let posts = document.getElementsByClassName("media-post");

function changeHeart(post) {
    let heart = post.querySelector(".like-glyph");
    if (heart.innerText === EMPTY_HEART) {
        heart.innerText = FULL_HEART;
    } else {
        heart.innerText = EMPTY_HEART;
    }
};

function showError(message) {
    showErrorModal();
    document.getElementById("modal-message").innerText = message;
    // setTimeout function doesn't like ()
    window.setTimeout(hideError, 5000);
};

for (let i = 0; i < posts.length; i++ ) {
    let like = posts[i].querySelector(".like");
    like.addEventListener('click', (event) => {
        mimicServerCall()
            .then(changeHeart(posts[i]))
            .catch( (error) => {showError(error);} )
    });
};

//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
