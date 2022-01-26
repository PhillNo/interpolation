// todo for each query, return the first point that can be interpolated, or pass through entire input set and return all points?

function Interpolate(x_arr, y_arr, x, method, additional_params=undefined)
{
    switch (method)
    {
        case "linear":
            return LinearInterp(x_arr, y_arr, x);
            
        case "sigmoid":
            if (additional_params.hasOwnProperty("sharpness_coefficient"))
            {
                return SigmoidInterp(x_arr, y_arr, x, additional_params["sharpness_coefficient"]);
            }
            else
            {
                return SigmoidInterp(x_arr, y_arr, x);
            }
    }
}//Interpolate

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

function SigmoidInterp(x_arr, y_arr, x, sharpness_coefficient = 12)
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
        x_to   = x_from ^ x_to;
        x_from = x_from ^ x_to;
    }

    return (y_to - y_from) / (1 + Math.exp(-sharpness_coefficient * ((x - x_from) - 0.5 * (x_to - x_from)))) + y_from;    
}//SigmoidInterpSingleSegment

