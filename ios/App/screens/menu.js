l.screen.menu = function()
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
		l.screen.change.game()
	}

	l.draw.blank()
	l.write.hud('Zambies!', l.entities.camera.width / 2, l.entities.camera.height / 2 - titleSize - fontSize, fontFamily, titleSize, colorYellow, 'center')
	l.write.hud('[Tilt] to move and aim', l.entities.camera.width / 2, l.entities.camera.height / 2 + fontSize, fontFamily, fontSize, colorGreen, 'center')
	l.write.hud('[Tap] or [Hold] to shoot', l.entities.camera.width / 2, l.entities.camera.height / 2 + fontSize * 3, fontFamily, fontSize, colorGreen, 'center')
	l.write.hud('Two-finger touch to start', textPadding, l.entities.camera.height - fontSize - textPadding, fontFamily, fontSize, colorWhite)
	l.draw.hud('gamecenter')
}