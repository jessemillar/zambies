l.screen.loading = function()
{
	var loadingString = null

	l.draw.blank(colorBlack)

	if (loadingTextState == 0)
	{
		loadingString = 'Loading'
	}
	else if (loadingTextState == 1)
	{
		loadingString = 'Loading.'
	}
	else if (loadingTextState == 2)
	{
		loadingString = 'Loading..'
	}
	else if (loadingTextState == 3)
	{
		loadingString = 'Loading...'
	}

	l.write.hud(loadingString, textPadding, l.entities.camera.height - fontSize - textPadding, fontFamily, fontSize, colorWhite)
}