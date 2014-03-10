l.quad = new Object() // Collect the quad tree functions

l.quad.divide = function(size)
{
    if (!l.quad.leaves)
    {
        l.quad.leaves = new Object()
            l.quad.leaves.size = Math.floor(l.canvas.width / size)
            l.quad.leaves.count = l.quad.leaves.size * l.quad.leaves.size
    }

    if (!l.quad.width && !l.quad.height)
    {
        l.quad.width = Math.floor(l.canvas.width / l.quad.leaves.size)
        l.quad.height = Math.floor(l.canvas.height / l.quad.leaves.size)
    }

    for (var i in l.entities)
    {
        l.entities[i].leaf = Math.floor(l.entities[i].y / l.quad.leaves.size) * l.quad.width + Math.floor(l.entities[i].x / l.quad.leaves.size)
    }
}

l.collision = function(a, b, code)
{
	if (l.entities[a] && l.entities[b])
    {
        var leafA = l.entities[a].leaf
        var leafB = l.entities[b].leaf

        if (leafB == leafA - l.quad.width - 1 || leafB == leafA - l.quad.width || leafB == leafA - l.quad.width + 1 || leafB == leafA - 1 || leafB == leafA || leafB == leafA + 1 || leafB == leafA + l.quad.width - 1 || leafB == leafA + l.quad.width || leafB == leafA + l.quad.width + 1)
        {
            if (l.entities[a].bounding.x < l.entities[b].bounding.x + l.entities[b].bounding.width && l.entities[a].bounding.x + l.entities[a].bounding.width > l.entities[b].bounding.x)
            {
                if (l.entities[a].bounding.y < l.entities[b].bounding.y + l.entities[b].bounding.height && l.entities[a].bounding.y + l.entities[a].bounding.height > l.entities[b].bounding.y)
                {
                    if (code)
                    {
                        eval(code)
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
            return false
        }
	}
    else
    {
    	if (l.entities[a])
    	{
    		for (var i in l.entities)
    		{
    			if (l.entities[i].category == b)
        		{
    				l.collision(a, i, code)
    			}
    		}
    	}
    	else if (l.entities[b])
    	{
    		for (var i in l.entities)
    		{
    			if (l.entities[i].category == a)
        		{
    				l.collision(i, b, code)
    			}
    		}
    	}
    	else
    	{
            for (var i = 0; i < l.tool.count.category(a); i++)
            {
                for (var i in l.entities)
                {
                    if (l.entities[i].category == a)
                    {
                        for (var j in l.entities)
                        {
                            if (l.entities[j].category == b)
                            {
                                l.collision(i, j, code)
                            }
                        }
                    }
                }
            }
    	}
    }
}