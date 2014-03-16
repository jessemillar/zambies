l.audio.make('song', 'sounds/song.wav')
l.audio.make('gameover', 'sounds/gameover.wav')
l.audio.make('kill', 'sounds/kill.wav')
l.audio.make('shoot', 'sounds/shoot.wav')

l.object.make('gamecenter', l.entities.camera.width - 28, l.entities.camera.height - 4, 24, 24)
	l.object.sprite('gamecenter', 'images/gamecenter.png')
	l.object.anchor('gamecenter', 0, 24)

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
	l.prototype.categorize('zombie', 'enemies')
	l.prototype.anchor('zombie', 5, 10)

	l.prototype.make('zombieGiblet', 3, 3)
		l.prototype.sprite('zombieGiblet', 'images/zombieGiblet.png')
		l.prototype.categorize('zombieGiblet', 'giblets')
		l.prototype.anchor('zombieGiblet', 2, 2)

l.prototype.make('boggart', 10, 10)
	l.prototype.sprite('boggart', 'images/boggart.png')
	l.prototype.categorize('boggart', 'enemies')
	l.prototype.anchor('boggart', 5, 10)

	l.prototype.make('boggartGiblet', 3, 3)
		l.prototype.sprite('boggartGiblet', 'images/boggartGiblet.png')
		l.prototype.categorize('boggartGiblet', 'giblets')
		l.prototype.anchor('boggartGiblet', 2, 2)

l.prototype.make('ghost', 10, 10)
	l.prototype.sprite('ghost', 'images/ghost.png')
	l.prototype.categorize('ghost', 'enemies')
	l.prototype.anchor('ghost', 5, 10)

	l.prototype.make('ghostGiblet', 3, 3)
		l.prototype.sprite('ghostGiblet', 'images/ghostGiblet.png')
		l.prototype.categorize('ghostGiblet', 'giblets')
		l.prototype.anchor('ghostGiblet', 2, 2)

l.prototype.make('wraith', 10, 10)
	l.prototype.sprite('wraith', 'images/wraith.png')
	l.prototype.categorize('wraith', 'enemies')
	l.prototype.anchor('wraith', 5, 10)

	l.prototype.make('wraithGiblet', 3, 3)
		l.prototype.sprite('wraithGiblet', 'images/wraithGiblet.png')
		l.prototype.categorize('wraithGiblet', 'giblets')
		l.prototype.anchor('wraithGiblet', 2, 2)