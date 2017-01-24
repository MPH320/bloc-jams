var albumShown = 0;
var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };

var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

var albumRage = {
     title: 'Rage Against The Machine',
     artist: 'Rage Against The Machine',
     label: 'Epic',
     year: '1992',
     albumArtUrl: 'assets/images/album_covers/22.jpg',
     songs: [
         { title: 'Bombtrack', duration: '4:03' },
         { title: 'Killing In The Name', duration: '5:13' },
         { title: 'Take The Power Back', duration: '5:35'},
         { title: 'Settle For Nothing', duration: '4:47' },
         { title: 'Bullet In The Head', duration: '5:07'}
     ]
 };

var albumsArray = [albumPicasso, albumMarconi, albumRage];
var currentAlbum = albumPicasso;

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     var $row = $(template);
    
    var clickHandler = function() {
         var songNumber = $(this).attr('data-song-number');
         if (currentlyPlayingSong !== null) {
		var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
		currentlyPlayingCell.html(currentlyPlayingSong);
	    }
        
        if (currentlyPlayingSong !== songNumber) {
		$(this).html(pauseButtonTemplate);
		currentlyPlayingSong = songNumber;
	    } else if (currentlyPlayingSong === songNumber) {
		$(this).html(playButtonTemplate);
		currentlyPlayingSong = null;
	    }
        
     };
    
     var onHover = function(event) {
         var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {              
            songNumberCell.html(playButtonTemplate);
        }
     };
     var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        }
     };
    
     $row.find('.song-item-number').click(clickHandler);
     $row.hover(onHover, offHover);
     return $row;
 };

var setCurrentAlbum = function(album) {
    
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
 
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
 
     $albumSongList.empty();
 
     for (var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };
 
function nextAlbum(album) {
    
    albumShown++;
    
    if(albumShown >= albumsArray.length)
    {
        albumShown = 0;
    }
    
    currentAlbum = albumsArray[albumShown];

}

document.getElementsByClassName('album-cover-art')[0].addEventListener("click", function(){ 
    nextAlbum(currentAlbum);
    setCurrentAlbum(currentAlbum);
    
});

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];

var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var currentlyPlayingSong = null;

 $(document).ready(function() {
     setCurrentAlbum(currentAlbum); 
});

