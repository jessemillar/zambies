l.screen.game = function()
{
	if (l.touch.touched('pause'))
	{
		l.ad.banner.show('top')
		l.change.screen('paused')
	}

	if (!spawned)
	{
		for (var i = 0; i < enemyCount; i++)
		{
			l.object.from('zombie', l.tool.random(0, l.canvas.width), l.tool.random(0, l.canvas.height))
			l.entities['zombie' + l.object.last.zombie].type = 'zombie'
		}

		for (var i = 0; i < enemyCount; i++)
		{
			if (l.tool.measure.total('player', 'zombie' + (Math.round(l.object.last.zombie - enemyCount) + i)) < safeZone)
			{
				var quadrant = Math.round(l.tool.random(0, 3))
				
				if (quadrant == 0)
				{
					var x = l.tool.random(0, l.canvas.width)
					var y = l.tool.random(0, l.canvas.height / 2 - safeZone / 2)
				}
				else if (quadrant == 1)
				{
					var x = l.tool.random(l.canvas.width / 2 + safeZone / 2, l.canvas.width)
					var y = l.tool.random(0, l.canvas.height)
				}
				else if (quadrant == 2)
				{
					var x = l.tool.random(0, l.canvas.width)
					var y = l.tool.random(l.canvas.height / 2 + safeZone / 2, l.canvas.height)
				}
				else if (quadrant == 3)
				{
					var x = l.tool.random(0, l.canvas.width / 2 - safeZone / 2)
					var y = l.tool.random(0, l.canvas.height)
				}
			
				l.move.snap('zombie' + (Math.round(l.object.last.zombie - enemyCount) + i), x, y)
			}
		}
		
		spawned = true
	}

	if (playerCanMove)
	{
		if (l.tilt.y < 0)
		{
			l.physics.push.up('player', playerSpeed * (Math.abs(l.tilt.y) / maxTilt))
		}
		else if (l.tilt.y > 0)
		{
			l.physics.push.down('player', playerSpeed * (Math.abs(l.tilt.y) / maxTilt))
		}

		if (l.tilt.x > 0)
		{
			l.physics.push.left('player', playerSpeed * (Math.abs(l.tilt.x) / maxTilt))
		}
		else if (l.tilt.x < 0)
		{
			l.physics.push.right('player', playerSpeed * (Math.abs(l.tilt.x) / maxTilt))
		}
	}

	if (l.touch.database.length == 1)
	{
		if (canShoot)
		{
			l.audio.rewind('shoot')
			l.audio.play('shoot')

			l.object.from('bullet', l.entities.player.anchor.x, l.entities.player.anchor.y - 5)
			shotsFired++

			if (l.entities.player.physics.momentum.total > 0)
			{
				bulletForce = startBulletForce + l.entities.player.physics.momentum.total
			}
			else
			{
				bulletForce = startBulletForce
			}

			if (Math.abs(l.tilt.x) < Math.abs(l.tilt.y))
			{
				var ratio = Math.abs(l.tilt.x) / Math.abs(l.tilt.y)
			}
			else
			{
				var ratio = Math.abs(l.tilt.y) / Math.abs(l.tilt.x)
			}

			var xForce = Math.abs(l.tilt.x) / Math.sqrt(Math.abs(l.tilt.x) * Math.abs(l.tilt.x) + Math.abs(l.tilt.y) * Math.abs(l.tilt.y)) * bulletForce
			var yForce = Math.abs(l.tilt.y) / Math.sqrt(Math.abs(l.tilt.x) * Math.abs(l.tilt.x) + Math.abs(l.tilt.y) * Math.abs(l.tilt.y)) * bulletForce

			if (l.tilt.x < 0)
			{
				xForce = -xForce
			}

			if (l.tilt.y < 0)
			{
				yForce = -yForce
			}

			l.physics.push.left('bullet' + l.object.last.bullet, xForce)
			l.physics.push.down('bullet' + l.object.last.bullet, yForce)
			
			canShoot = false

			setTimeout(function()
			{
				canShoot = true
			}, timeShoot)
		}
	}

	if (killed && shotsFired)
	{
		accuracy = killed / shotsFired * 100 // Make the number a human-readable percentage
	}

	if (killed) // Update the score
	{
		score = seconds * killed
	}
	else
	{
		score = seconds
	}

	moveEnemies()

	l.collision('bullets', 'enemies', 'killEnemy(a, b)')
	l.collision('player', 'enemies', 'collision(b)')

	l.physics.update('player')
	l.physics.update('bullets')
	l.physics.update('enemies')
	l.physics.update('giblets')

	for (var i in l.entities) // Delete the slow bullets
	{
		if (l.entities[i].category == 'bullets')
		{
			if (l.entities[i].physics.momentum.total < 1)
			{
				l.object.delete(i)
			}
		}
	}

	l.physics.bounce('player')
	l.physics.bounce('bullets')
	l.physics.bounce('enemies')

	l.camera.follow('player', 50, 50)

	l.draw.blank()
	l.buffer.object('player')
	l.buffer.object('enemies')
	l.buffer.object('giblets')
	l.buffer.object('bullets')
	l.draw.objects()

	l.write.hud(score, 10, l.entities.camera.height - fontSize - textPadding, fontFamily, fontSize, colorWhite)
	l.draw.hud('pause')
}