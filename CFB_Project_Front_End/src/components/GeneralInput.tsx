type Props = {
    text: string,
    placeholder: string,
    value: string,
    propFunction: (e: React.ChangeEvent<HTMLInputElement>) => void,
    error?: boolean,
    id?: string,
    className:string
};

const GeneralInput = ({text, placeholder, value, propFunction, error, id,className}: Props) => {

    return (
        <div>
            <input 
                className={`${className} ${error ? 'border-red-500' : ''} w-full p-2 bg-white`}
                type={text} 
                placeholder={placeholder} 
                value={value}
                onChange={propFunction}
                required={false}
                id={id}
            />
        </div>
    )
}

export default GeneralInput