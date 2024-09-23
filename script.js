// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const clearHistoryBtn = document.getElementById('clear-history-btn');
const searchHistoryList = document.getElementById('search-history-list');

// Initialize search history from local storage or create an empty array
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

// Function to display search history
function displaySearchHistory() {
    searchHistoryList.innerHTML = '';
    
    if (searchHistory.length === 0) {
        searchHistoryList.innerHTML = '<li>No search history yet...</li>';
        return;
    }

    searchHistory.forEach((term, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${term} <span onclick="deleteSearchTerm(${index})">&times;</span>`;
        searchHistoryList.appendChild(li);
    });
}

// Function to add search term to history
function addSearchTerm(term) {
    if (term.trim() !== '' && !searchHistory.includes(term)) {
        searchHistory.push(term);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        displaySearchHistory();
    } else if (term.trim() === '') {
        alert('Search term cannot be empty!');
    } else {
        alert('Search term already exists in history.');
    }
}

// Function to clear search history
function clearSearchHistory() {
    if (confirm("Are you sure you want to clear your search history?")) {
        searchHistory = [];
        localStorage.removeItem('searchHistory');
        displaySearchHistory();
    }
}

// Function to delete a specific search term
function deleteSearchTerm(index) {
    searchHistory.splice(index, 1);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    displaySearchHistory();
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value;
    addSearchTerm(searchTerm);
    searchInput.value = '';  // Clear the input after adding search term
});

clearHistoryBtn.addEventListener('click', clearSearchHistory);

// Display search history on page load
displaySearchHistory();
searchInput.addEventListener('keyup', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredHistory = searchHistory.filter(term => term.toLowerCase().includes(searchTerm));
    // Display filtered history as suggestions below input
});
