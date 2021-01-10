function loadGame(pieces){
    for(var key in pieces){
        if(pieces[key].alive){
            var occ = pieces.toString();
            var x = pieces[key].x.toString();
            var y = pieces[key].y.toString();
            doc = document.getElementById('t'+x+y);
        }
    }
}
function createBoard(){
    var body = document.body;
    var table =  document.createElement('table');

    table.setAttribute('class', 'chess-board');
    var tbody =  document.createElement('tbody');

    tbody.setAttribute('class', 'body');

    for(var i = 0; i <w;i++){
        var tr = document.createElement('tr');
        for(var j =0; j < w; j++){
            var td = document.createElement('td');

            var colour;
            if(i%2==0)
                colour = (i*w + j)%2==0?light:dark;
            else
                colour = (i*w + j)%2!=0?light:dark;
            td.setAttribute('class', colour);

            var id = 't'+(7 -i).toString() + j.toString();

            var btn = document.createElement('input');
            btn.setAttribute('type', "button");
            btn.setAttribute('class', id);
            btn.setAttribute('id', id);
            //...
            td.appendChild(btn);
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    body.appendChild(table);
}



createBoard();

/**
  <tr>
                    <th>8</th>
                    <td class="light">
                        <input type="button" bouton class='t70' id="t70" value="♜">
                       
for(var i = 0; i <w;i++){
        for(var j =0; j < w; j++){
            //rien
        }
    }


<td class="light">
    <input type="button" bouton class='t70' id="t70" value="♜">
    </input> 
</td>


*/