var loadingInterval = setInterval(function()
					{
						if (l.game.state == 'loading')
						{
							if (loadingTextState < 3)
							{
								loadingTextState++
							}
							else
							{
								loadingTextState = 0
							}
						}
						else
						{
							clearInterval(loadingInterval)
						}
					}, 750)

var creditsInterval = setInterval(function()
					{
						if (l.game.state == 'menu')
						{
							l.change.screen('credits')
						}
						else if (l.game.state == 'credits')
						{
							l.change.screen('menu')
						}
						else if (l.game.state !== 'loading')
						{
							clearInterval(creditsInterval)
						}
					}, 6500)

var scoreInterval = setInterval(function()
					{
						if (l.game.state == 'game')
						{
							seconds++
						}
					}, 1000)

document.addEventListener('pagehide', function()
{
	if (l.game.state == 'game')
	{
		l.ad.banner.show('top')
		l.change.screen('paused')
	}
})