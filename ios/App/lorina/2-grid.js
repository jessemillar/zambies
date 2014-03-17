l.grid = new Object()
l.grid.database = new Object()

// l.grid.database.col3.row4.x
// l.grid.database.col3.row4.y

l.grid.make = function(width, height, size)
{
    for (var y = 0; y < height + 1; y++)
    {
        for (var x = 0; x < width + 1; x++)
        {
            if (x < width && y < height) // Only save squares inside the play area, not the ones on the outside bottom and bottom-right (that are used to just make the visual square markers)
            {
                if (!l.grid.database['col' + (x + 1)])
                {
                    l.grid.database['col' + (x + 1)] = new Object()
                }

                if (!l.grid.database['col' + (x + 1)]['row' + (y + 1)])
                {
                    l.grid.database['col' + (x + 1)]['row' + (y + 1)] = new Object()
                }

                l.grid.database['col' + (x + 1)]['row' + (y + 1)].x = 0 - size + x * size + size
                l.grid.database['col' + (x + 1)]['row' + (y + 1)].y = 0 - size + y * size + size
            }
        }
    }

    console.log(JSON.stringify(l.grid.database))
}

/*
l.grid.draw = function()
{
    l.ctx.save()
    l.ctx.translate(l.canvas.width / 2, l.canvas.height / 2)
    for (var y = 0; y < height + 1; y++)
    {
        for (var x = 0; x < width + 1; x++)
        {
            // Center the player and draw things relative to our position
            var positionX = 0 - size + x * size + size / 2
            var positionY = 0 - size + y * size + size / 2

            l.ctx.drawImage(l.entities[l.buffer.database[i].name].sprite, positionX, positionY)

            if (x < width && y < height) // Only save squares inside the play area, not the ones on the outside bottom and bottom-right (that are used to just make the visual square markers)
            {
                var thingy = new Object() // Write grid data to an array to use later for drawing stuff in the tiles
                    thingy.column = x + 1
                    thingy.row = y + 1
                    thingy.x = 0 - size + x * size + size // Relates to positionX but is slightly different
                    thingy.y = 0 - size + y * size + size // Relates to positionY but is slightly different
                grid.push(thingy)
            }
        }
    }
}
*/