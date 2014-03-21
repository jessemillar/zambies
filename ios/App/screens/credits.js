l.screen.credits = function()
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
		l.change.screen('game')
	}
	
	l.draw.blank()
	l.write.hud('Programming - Jesse Millar', l.entities.camera.width / 2, l.entities.camera.height / 2 - fontSize * 3 - fontSize / 2, fontFamily, fontSize, colorYellow, 'center')
	l.write.hud('Music - Ryegore Manlyman', l.entities.camera.width / 2, l.entities.camera.height / 2 - fontSize, fontFamily, fontSize, colorYellow, 'center')
	l.write.hud('Enemy design - Jimmalimma', l.entities.camera.width / 2, l.entities.camera.height / 2 + fontSize * 2 - fontSize / 2, fontFamily, fontSize, colorYellow, 'center')
	l.write.hud('Two-fingers to start', textPadding, l.entities.camera.height - fontSize - textPadding, fontFamily, fontSize, colorWhite)
	l.draw.hud('gamecenter')
}