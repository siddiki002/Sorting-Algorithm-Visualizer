async function partition(p, r) {
    await sleep(delay);

    var i = p - 1;
    setColor(r, SELECTED);

    for(var j = p; j < r; j++) {
        await sleep(delay);

        if(arr[j] <= arr[r]) {
            i++;
            swap(i, j);
            setColor(j, RIGHT);
            setColor(i, LEFT);
        }
        else
            setColor(j, RIGHT);
    }

    if(i + 1 < r) {
        await sleep(delay);

        swap(i + 1, r);
        setColor(r, RIGHT);
        setColor(i + 1, SELECTED);
    }

    await sleep(delay);

    setColorRange(p, r, UNSORTED);

    return i + 1;
}

async function quicksort(p, r) {
    if(p < r) {
        var q = await partition(p, r);

        await quicksort(p, q - 1);

        setColorRange(p, q, SORTED);
        await quicksort(q + 1, r);

        setColorRange(q + 1, r, SORTED);
    }

    if(p == 0 && r == size - 1)
        await sleep(delay);
}
async function insertion_sort(p,r)
{
    var i, j, key;
    await sleep(delay);

    setColor(0, SELECTED);
    await sleep(delay);

    setColor(0, SORTED);

    for(i = p+1; i < size+1; i++) {
        await sleep(delay);

        setColor(i, SELECTED);
        await sleep(delay);

        j = i;
        key = arr[i];

        while(j > p && arr[j-1] > key) {
            setColor(j, COMPARE);
            await sleep(delay);

            swap(j, j - 1);
            setColor(j - 1, SELECTED);
            setColor(j, COMPARE);
            await sleep(delay);

            setColor(j, SORTED);
            await sleep(delay);

            j--;
        }

        setColor(j , SORTED);
    }
}


async function hybrid_quick_sort(p, r)
{
    while (p<r)
    {
        if(r-p +1 < 10){
            await insertion_sort(p,r);
            break;
        }
        else
        {
            var q = await(p,r);

            if(q-p < r-q){
                hybrid_quick_sort(p,q-1);
                r = q+1;
            }
            else
            {
                hybrid_quick_sort(q+1,r)
                r = q-1;
            }

        }
    }
}