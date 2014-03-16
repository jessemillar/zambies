function spawnEnemy(type)
{
	var direction = Math.round(l.tool.random(0, 3))

	if (direction == 0)
	{
		l.object.from(type, l.tool.random(20, l.canvas.width - 20), 20)
		l.physics.push.down(type + l.object.last[type], spawnForce)
		l.physics.push.right(type + l.object.last[type], l.tool.random(-spawnForce, spawnForce))
	}
	else if (direction == 1)
	{
		l.object.from(type, l.tool.random(20, l.canvas.width - 20), l.canvas.height)
		l.physics.push.up(type + l.object.last[type], spawnForce)
		l.physics.push.right(type + l.object.last[type], l.tool.random(-spawnForce, spawnForce))
	}
	else if (direction == 2)
	{
		l.object.from(type, 10, l.tool.random(20, l.canvas.height - 20))
		l.physics.push.right(type + l.object.last[type], spawnForce)
		l.physics.push.up(type + l.object.last[type], l.tool.random(-spawnForce, spawnForce))
	}
	else if (direction == 3)
	{
		l.object.from(type, l.canvas.width - 5, l.tool.random(20, l.canvas.height - 20))
		l.physics.push.left(type + l.object.last[type], spawnForce)
		l.physics.push.up(type + l.object.last[type], l.tool.random(-spawnForce, spawnForce))
	}

	l.entities[type + l.object.last[type]].type = type // Categorize the enemies
}

function moveEnemies()
{
	for (var i in l.entities) // Move the enemies
	{
		if (l.entities[i].type == 'zombie')
		{
			if (l.tool.measure.total('player', i) < zombieVision)
			{
				l.physics.pull.toward(i, 'player', zombieSpeed)
			}
		}
		else if (l.entities[i].type == 'ghost')
		{
			if (l.tool.measure.total('player', i) < ghostVision)
			{
				l.physics.pull.toward(i, 'player', ghostSpeed)
			}
		}
		else if (l.entities[i].type == 'boggart')
		{
			if (l.tool.measure.total('player', i) < boggartVision)
			{
				l.physics.pull.toward(i, 'player', boggartSpeed)
			}
		}
		else if (l.entities[i].type == 'wraith')
		{
			l.physics.pull.toward('player', i, wraithSpeed) // Pull the player toward the wraith
		}
	}
}

function killEnemy(bullet, enemy)
{
	l.audio.rewind('kill')
	l.audio.play('kill')

	killed++ // Log the kill

	if (bullet)
	{
		l.object.delete(bullet)
	}
	
	for (var i = 0; i < gibletCount; i++)
	{
		if (l.entities[enemy])
		{
			if (l.entities[enemy].type == 'zombie')
			{
				l.object.from('zombieGiblet', l.entities[enemy].anchor.x, l.entities[enemy].anchor.y)
			
				l.physics.scatter('zombieGiblet' + l.object.last.zombieGiblet, gibletForce)
				lifespanGiblet('zombieGiblet' + l.object.last.zombieGiblet, l.tool.random(gibletLife / 2, gibletLife))
			}
			else if (l.entities[enemy].type == 'ghost')
			{
				l.object.from('ghostGiblet', l.entities[enemy].anchor.x, l.entities[enemy].anchor.y)
			
				l.physics.scatter('ghostGiblet' + l.object.last.ghostGiblet, gibletForce)
				lifespanGiblet('ghostGiblet' + l.object.last.ghostGiblet, l.tool.random(gibletLife / 2, gibletLife))
			}
			else if (l.entities[enemy].type == 'boggart')
			{
				l.object.from('boggartGiblet', l.entities[enemy].anchor.x, l.entities[enemy].anchor.y)
			
				l.physics.scatter('boggartGiblet' + l.object.last.boggartGiblet, gibletForce)
				lifespanGiblet('boggartGiblet' + l.object.last.boggartGiblet, l.tool.random(gibletLife / 2, gibletLife))
			}
			else if (l.entities[enemy].type == 'wraith')
			{
				l.object.from('wraithGiblet', l.entities[enemy].anchor.x, l.entities[enemy].anchor.y)
			
				l.physics.scatter('wraithGiblet' + l.object.last.wraithGiblet, gibletForce)
				lifespanGiblet('wraithGiblet' + l.object.last.wraithGiblet, l.tool.random(gibletLife / 2, gibletLife))
			}
		}
	}

	if (l.entities[enemy].category == 'zombies')
	{
		spawnEnemy('ghost')
	}
	else if (l.entities[enemy].category == 'ghosts')
	{
		spawnEnemy('boggart')
	}
		else if (l.entities[enemy].category == 'boggarts')
	{
		spawnEnemy('wraith')
	}
	else if (l.entities[enemy].category == 'wraiths')
	{
		spawnEnemy('zombie')
	}
	
	l.object.delete(enemy)
}

function lifespanGiblet(giblet, time)
{
	setTimeout(function()
	{
		l.object.delete(giblet)
	}, time)
}

function collision(enemy)
{
	if (l.entities[enemy].type == 'ghost')
	{
		freeze(enemy)
	}
	else
	{
		gameover()
	}
}

function freeze(enemy)
{
	killEnemy(null, enemy)
	l.physics.momentum.stop('player')

	playerCanMove = false

	setTimeout(function()
	{
		playerCanMove = true
	}, freezeTime)
}

function gameover()
{
	l.audio.rewind('gameover')
	l.audio.play('gameover')

	if (highscore !== 0)
	{
		if (score > highscore)
		{
			newHighscore = true
			highscore = score
			localStorage.setItem('highscore', highscore)
		}
		else
		{
			newHighscore = false
		}
	}
	else
	{
		highscore = score
	}

	l.ad.banner.show('top')
	l.screen.change.gameover()
}