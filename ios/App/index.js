ejecta.include('lorina/1-lorina.js')
ejecta.include('lorina/2-audio.js')
ejecta.include('lorina/2-objects.js')
ejecta.include('lorina/2-prototype.js')
ejecta.include('lorina/3-draw.js')
ejecta.include('lorina/3-preloader.js')
ejecta.include('lorina/3-text.js')
ejecta.include('lorina/4-collisions.js')
ejecta.include('lorina/4-move.js')
ejecta.include('lorina/4-physics.js')
ejecta.include('lorina/5-keyboard.js')
ejecta.include('lorina/5-mouse.js')
ejecta.include('lorina/5-tilt.js')
ejecta.include('lorina/5-touch.js')

ejecta.include('listeners.js')
ejecta.include('functions.js')

ejecta.include('screens/loading.js')
ejecta.include('screens/menu.js')
ejecta.include('screens/game.js')
ejecta.include('screens/paused.js')
ejecta.include('screens/gameover.js')

l.ad.banner.show('top')

l.gamecenter.login.soft()

var colorBlack = '#111111'
var colorGreen = '#3D9970'
var colorYellow = '#FFDC00'
var colorWhite = '#FFFFFF'
var colorRed = '#FF4136'

l.game.setup(colorBlack)
l.tilt.enable()
l.touch.enable()

l.debug.all = false
l.debug.gamecenter = true

l.canvas.width = l.canvas.width * 1.75
l.canvas.height = l.canvas.width // Make the playing field square

l.physics.friction(2)

var spawned = false

var maxTilt = 22

var fontFamily = 'MinercraftoryRegular'
var fontSize = 20
var titleSize = 70
var achievementSize = 35
var totalSize = 35
var textPadding = 5

var topLine = l.entities.camera.height / 2 - achievementSize * 2 - fontSize
var middleLine = l.entities.camera.height / 2 - fontSize
var bottomLine = l.entities.camera.height / 2 + achievementSize * 2 - fontSize + textPadding

var loadingTextState = 0

var safeZone = l.canvas.width / 15
var playerSpeed = 6
var startBulletForce = l.canvas.width / 3
var bulletForce = startBulletForce
var gibletForce = l.canvas.width / 6
var gibletLife = 2000
var gibletCount = 6
var canShoot = true
var timeShoot = 500
var respawnForce = l.canvas.width / 4
var zombieCount = Math.floor(l.canvas.width / 18)
var zombieSpeed = playerSpeed / 2
var zombieVisionDistance = l.canvas.width / 5
var zombie2Speed = playerSpeed
var bulletLife = 1000

var reported = false
var accuracy = 0
var shotsFired = 0
var seconds = 0
var killed = 0
var score = 0
var newHighscore = false

var achievementValues = [200, 400, 600, 800, 1000, 3000, 5000, 7000, 9000, 11000, 13000, 15000]
var achievementTitles = ['a n00b', 'bazookasaur', 'a space man', 'a krazy d00d', 'THE d00d', 'a hunter', 'the one', 'beautiful', 'teh best', 'a w!nner', 'the special', 'the doge']

if (localStorage.getItem('highscore'))
{
	var highscore = localStorage.getItem('highscore')
}
else
{
	var highscore = 0
}

l.audio.make('song', 'sounds/song.wav')
l.audio.make('gameover', 'sounds/gameover.wav')
l.audio.make('kill', 'sounds/kill.wav')
l.audio.make('shoot', 'sounds/shoot.wav')

l.object.make('gamecenter', l.entities.camera.width - 28, l.entities.camera.height - 4, 24, 24)
	l.object.sprite('gamecenter', 'images/gamecenter.png')
	l.object.anchor('gamecenter', 0, 24)

l.object.make('loader', l.entities.camera.width - 28, 4, 24, 24)
	l.object.sprite('loader', 'images/loader.png', 96, 24, 4, 500)
	l.object.anchor('loader', 0, 0)

l.object.make('pause', l.entities.camera.width - 20, 4, 16, 16)
	l.object.sprite('pause', 'images/pause.png')
	l.object.anchor('pause', 0, 0)

l.object.make('player', l.canvas.width / 2, l.canvas.height / 2, 10, 10)
	l.object.sprite('player', 'images/player.png')
	l.object.anchor('player', 5, 10)

l.prototype.make('bullet', 3, 3)
	l.prototype.sprite('bullet', 'images/bullet.png')
	l.prototype.categorize('bullet', 'bullets')
	l.prototype.anchor('bullet', 3, 2)

l.prototype.make('zombie', 10, 10)
	l.prototype.sprite('zombie', 'images/zombie.png')
	l.prototype.categorize('zombie', 'zombies')
	l.prototype.anchor('zombie', 5, 10)

l.prototype.make('giblet', 3, 3)
	l.prototype.sprite('giblet', 'images/giblet.png')
	l.prototype.categorize('giblet', 'giblets')
	l.prototype.anchor('giblet', 2, 2)

l.prototype.make('zombie2', 10, 10)
	l.prototype.sprite('zombie2', 'images/zombie2.png')
	l.prototype.categorize('zombie2', 'zombies2')
	l.prototype.anchor('zombie2', 5, 10)

l.prototype.make('giblet2', 3, 3)
	l.prototype.sprite('giblet2', 'images/giblet2.png')
	l.prototype.categorize('giblet2', 'giblets')
	l.prototype.anchor('giblet2', 2, 2)

l.game.start()

l.audio.loop('song')