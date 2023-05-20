const tableBody = document.querySelector('#table tbody');
const postId_btn = document.querySelector('#sortByPostId');
const id_btn = document.querySelector('#sortById');
const iconid = document.querySelector('#iconId');
const iconPostId = document.querySelector('#iconPostId');
const prevPageBtn = document.querySelector('#precedent');
const nextPageBtn = document.querySelector('#next');
let comments = [] ;
let isSortingAsc = true;
let currentPage = 1;
const limit = 10;


/*********************************************
 * ***************SORTING BY POSTID***********
 * *******************************************
 */
function sortingByPostId(e) 
{
  e.preventDefault();

  if(isSortingAsc){
    comments.sort((a,b) => a.postId - b.postId);
    iconPostId.innerHTML = '<i class="fas fa-sort-amount-up-alt"></i>';
  } else {
    comments.sort((a,b) => b.postId - a.postId);
    iconPostId.innerHTML = '<i class="fas fa-sort-amount-down-alt"></i>';
  }

  updatingCommentFecth();
  isSortingAsc = !isSortingAsc;
}

/**********************************************************
 * *********************SORTING BY ID**********************
 * ********************************************************
 */
function sortingById() 
{
  if(isSortingAsc){
    comments.sort((a, b) => a.id - b.id);
    iconid.innerHTML = '<i class="fas fa-sort-amount-up-alt"></i>'
  } else {
    comments.sort((a,b) => b.id - a.id);
    iconid.innerHTML = '<i class="fas fa-sort-amount-down-alt"></i>'
  }
  updatingCommentFecth();
  isSortingAsc = !isSortingAsc;
}

/**********************************************
 ************* UPDATINGCOMMENTFETCH ***********
 *********************************************
 */
function updatingCommentFecth() 
{
  tableBody.innerHTML = '';

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;

  const commentShows = comments.slice(startIndex, endIndex);

  commentShows.forEach(comment => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${comment.postId}</td>
      <td>${comment.id}</td>
      <td>${comment.name}</td>
      <td>${comment.email}</td>
      <td>${comment.body}</td>
    `
    tableBody.appendChild(row);
  });
  prevPageBtn.disabled = (currentPage === 1);
  nextPageBtn.disabled = (comments.length <= endIndex);
}

//ADDING EVENT FOR THE SORT
postId_btn.addEventListener('click', sortingByPostId);
id_btn.addEventListener('click', sortingById);

/**********************************************
 ************* CLICKKING PREVPAGEBTN***********
 *********************************************
 */
prevPageBtn.addEventListener('click', () =>{
  if(currentPage > 1) {
    currentPage--;
    console.log(currentPage);
    updatingCommentFecth();
  }
})

/**********************************************
 ************* CLICKKING NEXTPAGEBTN***********
 *********************************************
 */
nextPageBtn.addEventListener('click', () => {
  const totalPage = Math.ceil(comments.length / limit);
  console.log(totalPage);
  if(currentPage < totalPage ) {
    currentPage++;
    console.log(currentPage);
    updatingCommentFecth();
  }
})

/**********************************************
 ************* FETCHING DATA ******************
 *********************************************
 */
function fetchComments(page)
{
  
  fetch(`https:jsonplaceholder.typicode.com/comments`)
  .then(response => response.json())
  .then(data => {
    comments = data;
    updatingCommentFecth();
  })
  .catch((error) => {
    console.log(error);
  })

}

fetchComments(1);