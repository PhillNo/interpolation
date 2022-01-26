@@ -1,26 +1,95 @@
function LinearInterp(x_from, x_to, y_from, y_to, x)
function Interpolate(x_arr, y_arr, x, method, additional_params=undefined)
{
    //Throw an exception is x is out of provided bounds. Necessary as an alternate exit point since an error
    //code like -1 is also a potential valid output.
    //But is it necessary that the interpolated point be between two arbitrary points on a line?
    //if(x > Math.max(x_from, x_to) || x < Math.min(x_from, x_to)
    //{
    //    throw "x is out of provided bounds";
    //}//if x is OOB
    switch (method)
    {
        case "linear":
            return LinearInterp(x_arr, y_arr, x);
            
        case "sigmoid":
            if (additional_params["sharpness_coefficient"] != undefined)
            {
                return SigmoidInterp(x_arr, y_arr, x, additional_params["sharpness_coefficient"]);
            }
            else
            {
                return SigmoidInterp(x_arr, y_arr, x);
            }
    }
}

function LinearInterp(x_arr, y_arr, x)
{
    if (x_arr.length == undefined || y_arr.length == undefined || x_arr.length != y_arr.length)
    {
        throw "expected input arrays of equal length";
    }
    
    let interpolated_vals = [];
    
    for (let i = 0; i < x_arr.length - 1; i++)
    {
        if((x <= x_arr[i] && x >= x_arr[i + 1]) || (x >= x_arr[i] && x <= x_arr[i + 1]))
        {
            interpolated_vals.push(LinearInterpSingleSegment(x_arr[i], y_arr[i], x_arr[i + 1], y_arr[i + 1], x));
        }
    }
    
    return interpolated_vals;

}//LinearInterp

function LinearInterpSingleSegment(x_from, y_from, x_to, y_to, x)
{
    if (x_from == x_to)
    {
        if (y_from != y_to)
        {
            throw "can not interpolate over vertical line"
        }
        
        return y_from;
    }
    
    m = (y_to - y_from) / (x_to - x_from);

    return y_from + m * (x - x_from);
    
}//LinearInterpSingleSegment

}//LinearInterp

function SigmoidInterp(x_from, x_to, y_from, y_to, x, sharpness_coefficient = 12)
function SigmoidInterp(x_arr, y_arr, x, sharpness_coefficient = 12)
{
    //if(x > Math.max(x_from, x_to) || x < Math.min(x_from, x_to)
    //{
    //    throw "x is out of provided bounds"; //is this necessary since a Sigmoid goes on forever?
    //}//if x is OOB
    if (x_arr.length == undefined || y_arr.length == undefined || x_arr.length != y_arr.length)
    {
        throw "expected input arrays of equal length";
    }
    
    let interpolated_vals = [];
    
    for (let i = 0; i < x_arr.length - 1; i++)
    {
        if((x <= x_arr[i] && x >= x_arr[i + 1]) || (x >= x_arr[i] && x <= x_arr[i + 1]))
        {
            interpolated_vals.push(SigmoidInterpSingleSegment(x_arr[i], y_arr[i], x_arr[i + 1], y_arr[i + 1], x, sharpness_coefficient));
        }
    }
    
    return interpolated_vals;
    
}//SigmoidInterp

function SigmoidInterpSingleSegment(x_from, y_from, x_to, y_to, x, sharpness_coefficient = 12)
{
    if (x_from == x_to)
    {
        if (y_from != y_to)
        {
            throw "can not interpolate over vertical line"
        }
        
        return y_from;
    }
    
    
    if (x_from > x_to) //swap values if x_from is greater than x_to
    {
        x_from = x_from ^ x_to;
@ -28,6 +97,7 @@ function SigmoidInterp(x_from, x_to, y_from, y_to, x, sharpness_coefficient = 12
        x_from = x_from ^ x_to;
    }

    return (y_to - y_from) / (1 + Math.exp(-sharpness_coefficient * ((x - x_from) - 0.5 * (x_to - x_from)))) + y_from;
    return (y_to - y_from) / (1 + Math.exp(-sharpness_coefficient * ((x - x_from) - 0.5 * (x_to - x_from)))) + y_from;    

}//SigmoidInterpSingleSegment

}//SigmoidInterp
