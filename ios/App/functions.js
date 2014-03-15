function spawnZombie(count)
{
	if (!count)
	{
		count = 1
	}

	for (var i = 0; i < count; i++)
	{
		var direction = Math.round(l.tool.random(0, 3))

		if (direction == 0)
		{
			l.object.from('zombie2', l.tool.random(20, l.canvas.width - 20), 20)
			l.physics.push.down('zombie2' + l.object.last.zombie2, respawnForce)
			l.physics.push.right('zombie2' + l.object.last.zombie2, l.tool.random(-respawnForce, respawnForce))	
		}
		else if (direction == 1)
		{
			l.object.from('zombie2', l.tool.random(20, l.canvas.width - 20), l.canvas.height)
			l.physics.push.up('zombie2' + l.object.last.zombie2, respawnForce)
			l.physics.push.right('zombie2' + l.object.last.zombie2, l.tool.random(-respawnForce, respawnForce))
		}
		else if (direction == 2)
		{
			l.object.from('zombie2', 10, l.tool.random(20, l.canvas.height - 20))
			l.physics.push.right('zombie2' + l.object.last.zombie2, respawnForce)
			l.physics.push.up('zombie2' + l.object.last.zombie2, l.tool.random(-respawnForce, respawnForce))
		}
		else if (direction == 3)
		{
			l.object.from('zombie2', l.canvas.width - 5, l.tool.random(20, l.canvas.height - 20))
			l.physics.push.left('zombie2' + l.object.last.zombie2, respawnForce)
			l.physics.push.up('zombie2' + l.object.last.zombie2, l.tool.random(-respawnForce, respawnForce))
		}
	}
}

function killZombie(bullet, zombie)
{
	l.audio.rewind('kill')
	l.audio.play('kill')

	killed++ // Log the kill

	l.object.delete(bullet)
	
	for (var i = 0; i < gibletCount; i++)
	{
		if (l.entities[zombie])
		{
			l.object.from('giblet', l.entities[zombie].anchor.x, l.entities[zombie].anchor.y)
			
			l.physics.scatter('giblet' + l.object.last.giblet, gibletForce)
			lifespanGiblet('giblet' + l.object.last.giblet, l.tool.random(gibletLife / 2, gibletLife))
		}
	}
	
	l.object.delete(zombie)

	spawnZombie() // Let's make the whole survival thing hopeless, shall we?
}

function lifespanGiblet(giblet, time)
{
	setTimeout(function()
	{
		l.object.delete(giblet)
	}, time)
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