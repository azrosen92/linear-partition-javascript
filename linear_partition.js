function linear_partition(seq, k) {
    n = seq.length;
    
    if (k <= 0) {
        return [];
    }
    if (k > n) {
        return seq.map(function(x) { return [x]; });
    }
    
    var table = [];
    var solution = [];
    
    for (var i = 0; i < n; i++) {
        var row = [];
        for (var j = 0; j < k; j++) {
            row.push(0);
        }
        table.push(row);
    }

    for (var i = 0; i < n-1; i++) {
        var row = [];
        for (var j = 0; j < k-1; j++) {
            row.push(0);
        }
        solution.push(row);
    }
 
    for (var i = 0; i < n; i++) {
        if (i != 0) {
            table[i][0] = seq[i] + table[i-1][0];   
        } else {
            table[i][0] = seq[i];
        }
    }
  
    for (var j = 0; j < k; j++) {
        table[0][j] = seq[0];   
    }

    for (var i = 1; i < n; i++) {
        for (var j = 1; j < k; j++) {
            var m = [];
            var min;
            for (var x = 0; x < i; x++) {
                var list_of_pairs = [];
                var list_of_maxes = [];
                for (var x = 0; x < i; x++) {
                    var max = Math.max(table[x][j-1], table[i][0]-table[x][0]);
                    list_of_pairs.push([max, x]);
                    list_of_maxes.push(max);
                }
            }
            min = Math.min.apply(this, list_of_maxes);
            m = list_of_pairs.reduce(function(previous, current) {
                return current[0] <= previous[0] ? current : previous;
            }, [Infinity]);
            table[i][j] = m[0];
            solution[i-1][j-1] = m[1];
        }
    }
       
    n = n-1;
    k = k-2;
    var ans = [];
    while (k >= 0) {
        var sub_list = [];
        for (var i = solution[n-1][k]+1; i < n+1; i++) {
            sub_list.push(seq[i]);
        }
        ans = [sub_list].concat(ans);
        n = solution[n-1][k];
        k = k-1;
    }

    console.log(ans);
    var beginning_list = [];
    for (var i = 0; i < n+1; i++) {
        beginning_list.push(seq[i]);
    }
    ans = [beginning_list].concat(ans);
    console.log(ans); 
    return ans;
}
