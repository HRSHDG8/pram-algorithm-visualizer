import {FC, useMemo, useState} from "react";
import {Data, prefixSum} from "../../algorithms/prefix-sum";
import {Array} from '../array/Array'
import {Button, FormControl, FormHelperText, Input} from "@mui/material";
import {useTheme} from "../../theme/Theme";

export const PrefixSum: FC = () => {

    const {theme} = useTheme();
    const isLight = theme === 'light'

    const [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7, 8])
    const [text, setText] = useState(arr.join(','))
    const [error, setError] = useState(false)
    const values = useMemo<Data[]>(() => prefixSum(arr), [arr])

    const handleInput = (value: string) => {
        setText(value);
    }

    const handleSubmit = () => {
        const values = text.split(',').map(e => e.trim()).map(e => parseInt(e));
        console.log()
        if (!values.includes(NaN)) {
            setArr(values)
            setError(false)
        } else {
            setArr([])
            setError(true)
        }
    }

    return (
        <div className="App">
            <FormControl error={error} style={{zIndex: 1000, marginBottom: 30}}>
            <Input style={{zIndex: 1000,  width: 300}} value={text}
                   onChange={(e) => handleInput(e.target.value)}
            />
                {error && <FormHelperText style={{zIndex: 1000}} >Please input valid Comma separated numbers</FormHelperText>}
            </FormControl>
            <Button onClick={handleSubmit} style={{zIndex: 1000, color: isLight ? 'rgba(0, 0, 0, 0.6)' : 'inherit'}}
                    variant={'text'}>Run</Button>
            <Array data={values}/>
        </div>
    );
}