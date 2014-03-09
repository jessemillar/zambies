l.collision = function(a, b, code)
{
	l.keyring.update()

	if (l.entities[a] && l.entities[b])
    {
        if (l.entities[a].bounding.x < l.entities[b].bounding.x + l.entities[b].bounding.width && l.entities[a].bounding.x + l.entities[a].bounding.width > l.entities[b].bounding.x)
        {
            if (l.entities[a].bounding.y < l.entities[b].bounding.y + l.entities[b].bounding.height && l.entities[a].bounding.y + l.entities[a].bounding.height > l.entities[b].bounding.y)
            {
                if (code)
                {
                    eval(code)
					l.keyring.update()
                }
                else
                {
                    return true
                }
            }
            else
            {
                return false
            }
        }
        else
        {
            return false
        }
	}
    else
    {
    	if (l.entities[a])
    	{
    		l.keyring.update()

    		for (var i = 0; i < l.keyring.keys.length; i++)
    		{
    			if (l.entities[l.keyring.keys[i]].category == b)
        		{
    				l.collision(a, l.keyring.keys[i], code)
    			}
    		}
    	}
    	else if (l.entities[b])
    	{
    		l.keyring.update()

    		for (var i = 0; i < l.keyring.keys.length; i++)
    		{
    			if (l.entities[l.keyring.keys[i]].category == a)
        		{
    				l.collision(l.keyring.keys[i], b, code)
    			}
    		}
    	}
    	else
    	{
			l.keyring.update()

            for (var i = 0; i < l.tool.count.category(a); i++)
            {
                for (var j = 0; j < l.keyring.keys.length; j++)
                {
                    if (l.entities[l.keyring.keys[j]].category == a)
                    {
                        for (var k = 0; k < l.keyring.keys.length; k++)
                        {
                            if (l.entities[l.keyring.keys[k]].category == b)
                            {
                                l.collision(l.keyring.keys[j], l.keyring.keys[k], code)
                            }
                        }
                    }
                }
            }
    	}
    }
}