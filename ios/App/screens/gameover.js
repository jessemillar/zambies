l.screen.gameover = function()
{
	if (l.touch.touched('gamecenter'))
	{
		if (!l.gamecenter.authed)
		{
			l.gamecenter.login.hard()
		}
		else
		{
			l.gamecenter.show.leaderboard('Highscore')
		}
	}

	if (!reported && l.gamecenter.authed)
	{
		l.gamecenter.submit.score('Highscore', score)

		l.gamecenter.submit.score('Lifespan', seconds)

		l.gamecenter.submit.score('Killed', killed)

	    l.gamecenter.submit.score('Accuracy', accuracy)

	    reported = true
	}

	if (l.touch.database.length > 1)
	{
		l.ad.banner.hide()
		l.object.delete('bullets')
		l.object.delete('enemies')
		l.object.delete('giblets')
		l.physics.momentum.stop('player')
		l.move.snap('player', l.canvas.width / 2, l.canvas.height / 2)
		seconds = 0
		killed = 0
		score = 0
		shotsFired = 0
		accuracy = 0
		reported = false
		spawned = false
		l.screen.change.game()
	}

	l.draw.blank(colorBlack)

	if (score > 1)
	{
		var pluralPoints = ' points'
	}
	else
	{
		var pluralPoints = ' point'
	}
	l.write.hud(score + pluralPoints, l.entities.camera.width / 2, topLine, fontFamily, totalSize, colorWhite, 'center')

	if (score < achievementValues[0])
	{
		var achievement = achievementTitles[0]
	}
	else if (score < achievementValues[1])
	{
		var achievement = achievementTitles[1]
	}
	else if (score < achievementValues[2])
	{
		var achievement = achievementTitles[2]
	}
	else if (score < achievementValues[3])
	{
		var achievement = achievementTitles[3]
	}
	else if (score < achievementValues[4])
	{
		var achievement = achievementTitles[4]
	}
	else if (score < achievementValues[5])
	{
		var achievement = achievementTitles[5]
	}
	else if (score < achievementValues[6])
	{
		var achievement = achievementTitles[6]
	}
	else if (score < achievementValues[7])
	{
		var achievement = achievementTitles[7]
	}
	else if (score < achievementValues[8])
	{
		var achievement = achievementTitles[8]
	}
	else if (score < achievementValues[9])
	{
		var achievement = achievementTitles[9]
	}
	else if (score < achievementValues[10])
	{
		var achievement = achievementTitles[10]
	}
	else if (score < achievementValues[11])
	{
		var achievement = achievementTitles[11]
	}
	else
	{
		var achievement = achievementTitles[11]
	}

	l.write.hud('You\'re ' + achievement + '!', l.entities.camera.width / 2, middleLine, fontFamily, achievementSize, colorYellow, 'center')
	if (newHighscore)
	{
		l.write.hud('New local high score!', l.entities.camera.width / 2, bottomLine, fontFamily, fontSize, colorYellow, 'center')
	}
	else
	{
		if (localStorage.getItem('highscore') == null)
		{
			l.write.hud('No highscores yet!', l.entities.camera.width / 2, bottomLine, fontFamily, fontSize, colorGreen, 'center')
		}
		else
		{
			l.write.hud('Local highscore - ' + localStorage.getItem('highscore') + ' points', l.entities.camera.width / 2, bottomLine, fontFamily, fontSize, colorGreen, 'center')
		}
	}
	l.write.hud('Two-fingers to retry', textPadding, l.entities.camera.height - fontSize - textPadding, fontFamily, fontSize, colorWhite)
	l.draw.hud('gamecenter')
}