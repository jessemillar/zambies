l.screen.paused = function()
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

	if (l.touch.database.length > 1)
	{
		l.ad.banner.hide()
		l.change.screen('game')
	}
	
	l.draw.blank()
	if (score > 1)
	{
		var pluralPoints = ' points'
	}
	else
	{
		var pluralPoints = ' point'
	}
	l.write.hud(score + pluralPoints, l.entities.camera.width / 2, l.entities.camera.height / 2 - achievementSize * 2 - fontSize, fontFamily, totalSize, colorWhite, 'center')
	l.write.hud('Paused!', l.entities.camera.width / 2, l.entities.camera.height / 2 - fontSize, fontFamily, achievementSize, colorYellow, 'center')
	l.write.hud('Local highscore - ' + localStorage.getItem('highscore') + ' points', l.entities.camera.width / 2, l.entities.camera.height / 2 + achievementSize * 2 - fontSize + textPadding, fontFamily, fontSize, colorGreen, 'center')
	l.write.hud('Two-fingers to resume', textPadding, l.entities.camera.height - fontSize - textPadding, fontFamily, fontSize, colorWhite)

	l.draw.hud('gamecenter')
}