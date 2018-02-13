import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', e => {
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  const searchLimit = document.getElementById('limit').value;
  const searchTerm = searchInput.value;
  if (searchTerm == '') {
    showMessage('Please add a term for searching', 'alert-danger');
  }
  searchInput.value = '';

  reddit.search(searchTerm, searchLimit, sortBy).then(results => {
    let output = '<div class="card-columns">';
    console.log(results);
    results.forEach(post => {
      let image = post.preview
        ? post.preview.images[0].source.url
        : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';
      output += `
      <div class="card mb-3">
      <img class="card-img-top" src="${image}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${post.title}</h5>
        <p class="card-text">${truncateString(post.selftext, 75)}</p>
        <a href="${post.url}" target="_blank" class="btn btn-success">See more</a>
        <hr>
        <span class="badge badge-success">Subreddit: ${post.subreddit}</span> 
        <span class="badge badge-warning">Score: ${post.score}</span>
      </div>
    </div>
      `;
    });
    output += '</div>';
    document.getElementById('results').innerHTML = output;
  });

  e.preventDefault();
});

function showMessage(message, className) {
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  const searchContainer = document.getElementById('search-container');
  const search = document.getElementById('search');

  searchContainer.insertBefore(div, search);

  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
}


function truncateString(myString, limit) {
  const shortened = myString.indexOf(' ', limit);
  if (shortened == -1) return myString;
  return myString.substring(0, shortened);
}