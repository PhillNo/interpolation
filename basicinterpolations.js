// todo for each query, return the first point that can be interpolated, or pass through entire input set and return all points?

function Interpolate(x_arr, y_arr, x, method, additional_params=undefined)
{
    if (x_arr.length == undefined || y_arr.length == undefined || x_arr.length != y_arr.length)
    {
        throw "Interpolate expects input arrays of equal length.";
    }
    
    let interpolated_vals = [];
    let Interp_Algorithm LinearInterpSingleSegment; //default
    
    switch (method)
    {
        case "linear":
            algorithm = LinearInterpSingleSegment;
            break;
        case "sigmoid":
            algorithm = SigmoidInterpSingleSegment;
            break;
    }
    
    for (let i = 0; i < x_arr.length - 1; i++)
    {
        interpolated_vals.push(Interp_Algorithm(x_arr[i], y_arr[i], x_arr[i + 1], y_arr[i + 1], x, additional_params)); // todo put this loop in each case
    }
    
    return interpolated_vals;
    
}//Interpolate


function LinearInterpSingleSegment(x_from, y_from, x_to, y_to, x, additional_params)
{
    if (x_from == x_to)
    {
        if (y_from != y_to)
        {
            return NaN; //does not interpolate over verical line
        }
        else
        {
            return y_from;
        }
    }
    
    m = (y_to - y_from) / (x_to - x_from);

    return y_from + m * (x - x_from);
    
}//LinearInterpSingleSegment

function SigmoidInterpSingleSegment(x_from, y_from, x_to, y_to, x)
{
    let sharpness_coefficient = 12;
    
    if (additional_params.hasOwnProperty("sharpness_coefficient"))
    {
        sharpness_coefficient = additional_params["sharpness_coefficient"];
    }
    
    if (x_from == x_to)
    {
        if (y_from != y_to)
        {
            return NaN; //does not interpolate over verical line
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

