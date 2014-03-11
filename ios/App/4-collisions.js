l.quad = new Object() // Collect the quad tree functions

l.quad.divide = function(depth)
{
    if (!l.quad.depth)
    {
        l.quad.depth = depth * 2
    }

    if (!l.quad.leaf)
    {
        l.quad.leaf = new Object()
            l.quad.leaf.count = l.quad.depth * l.quad.depth
            l.quad.leaf.width = Math.floor(l.canvas.width / l.quad.depth)
            l.quad.leaf.height = Math.floor(l.canvas.height / l.quad.depth)
    }
    else
    {
        for (var i = 0; i < l.quad.leaf.count; i++) // Wipe the previous arrays
        {
            if (l.quad.leaf['id' + i])
            {
                l.quad.leaf['id' + i].length = 0
            }
        }
    }

    for (var i in l.entities)
    {
        var leaf = Math.floor(l.entities[i].anchor.y / l.quad.leaf.height) * l.quad.depth + Math.floor(l.entities[i].anchor.x / l.quad.leaf.width)

        if (!l.quad.leaf['id' + leaf])
        {
            l.quad.leaf['id' + leaf] = new Array()
        }
        else
        {
            l.quad.leaf['id' + leaf].push(i)
        }

        l.entities[i].leaf = leaf
    }
}

l.quad.locate = function(name)
{
    return l.quad.leaf['id' + l.entities[name].leaf].concat(l.quad.leaf['id' + (l.entities[name].leaf - l.quad.width - 1)], l.quad.leaf['id' + (l.entities[name].leaf - l.quad.width)], l.quad.leaf['id' + (l.entities[name].leaf - l.quad.width + 1)], l.quad.leaf['id' + (l.entities[name].leaf - 1)], l.quad.leaf['id' + (l.entities[name].leaf + 1)], l.quad.leaf['id' + (l.entities[name].leaf + l.quad.width - 1)], l.quad.leaf['id' + (l.entities[name].leaf + l.quad.width)], l.quad.leaf['id' + (l.entities[name].leaf + l.quad.width + 1)])
}

l.collision = function(a, b, code)
{
	if (l.entities[a] && l.entities[b]) // Check a for collisions with b
    {
        var possibilities = l.quad.locate(a)

        for (i in possibilities)
        {
            if (possibilities[i] == b) // Make sure it's not undefined (a leaf with nothing in it returns undefined)
            {
                if (l.entities[a].bounding.x < l.entities[b].bounding.x + l.entities[b].bounding.width && l.entities[a].bounding.x + l.entities[a].bounding.width > l.entities[b].bounding.x && l.entities[a].bounding.y < l.entities[b].bounding.y + l.entities[b].bounding.height && l.entities[a].bounding.y + l.entities[a].bounding.height > l.entities[b].bounding.y)
                {
                    if (code)
                    {
                        eval(code)
                        break
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
            for (var i in l.entities)
            {
                if (l.entities[i].category == a)
                {
                    var possibilities = l.quad.locate(a)

                    for (var j in possibilities)
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