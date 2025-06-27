import {type FC} from "react";

const ErrorMessage: FC<{error: string}> = ({error}) => {
    return (
        <p className="text-red-500 text-sm my-2">{error}</p>
    )
}

export default ErrorMessage
