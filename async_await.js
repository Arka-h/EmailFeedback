// fetchAlbums = () => {
//   fetch("https://rallycoding.herokuapp.com/api/music_albums") //returns a promise
//     .then(res => res.json()) //returns a promise
//     .then(json => console.log(json));
// };
// fetchAlbums();

//syntactic sugar

const fetchAlbums = async () => {
  //async function fetchAlbums(){
  const res = await fetch("https://rallycoding.herokuapp.com/api/music_albums");
  const json = await res.json();
  console.log(json);
};
fetchAlbums();
// Is not entirely representative of what is happening behind the scenes
