import {Data} from "../../algorithms/prefix-sum";
import {createElement, FC, Fragment, useEffect, useState} from "react";
import classes from './Array.module.css'
import $ from 'jquery'
import {useTheme} from "../../theme/Theme";

interface ArrayProps {
    data: Data[]
}

//@ts-ignore
const lineForDivs = (from, to) => {
    const line = $('#ref-line').clone();
    const div1 = $('#' + from);
    const div2 = $('#' + to);
    line.removeAttr('id')
    if (div1 && div2 && div1.offset() && div2.offset()) {
        //@ts-ignore
        const x1 = div1.offset().left + (div1.width());
        //@ts-ignore
        const y1 = div1.offset().top + (div1.height() + 30);
        //@ts-ignore
        const x2 = div2.offset().left + (div2.width());
        //@ts-ignore
        const y2 = div2.offset().top + (div2.height() - 25);

        line.attr('x1', x1).attr('y1', y1).attr('x2', x2).attr('y2', y2);

        const line1 = createElement('line', {x1, y1, x2, y2})
        const svg = $(`<svg width="1000" height="1000"></svg>`)
        svg.append(line)
        const div = $('#svg-ref')
        div.append(svg)
        return <>
            {line1}
        </>
    } else return null;

}
export const Array: FC<ArrayProps> = ({data}) => {

    const {theme} = useTheme();
    const isLight = theme === 'light'

    const [lines, setLines] = useState<any[]>([]);
    useEffect(() => {
        const svgs = [];
        for (let i = 1; i < data.length; i++) {
            const arr = data[i].values
            for (let j = 0; j < arr.length; j++) {
                const change = arr[j].change
                if (change) {
                    const from1 = ((i - 1) + '-' + change.from1)
                    const from2 = ((i - 1) + '-' + change.from2)
                    const to = i + '-' + j
                    svgs.push(lineForDivs(from1, to))
                    svgs.push(lineForDivs(from2, to))

                }
            }
        }
        setLines(svgs.filter(e => e != null))
    }, [data])
    return <>
        <div>
            {data.map(({values}, i) => {
                return <Fragment key={i}>
                    <div className={classes.parent}>
                        {
                            values.map(({value, change}, j) => <div key={i + '-' + j}
                                                                    id={(i + '-' + j)}
                                                                    className={classes.container + " " + (isLight ? classes.lightContainer : classes.darkContainer)}>{value}</div>)
                        }
                    </div>
                    <br/>
                    <br/>
                    <br/>
                </Fragment>
            })
            }
        </div>
        <line id={'ref-line'}/>
        {/*@ts-ignore*/}
        <svg theme={theme}>
            {lines.map(e => e)}
        </svg>
    </>
}