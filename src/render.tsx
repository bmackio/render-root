import React from "react";

export type CompKv = {
    [key: string]: React.FC<any> | any;
}

export interface CompData {
    name: string;
    properties: any;
}

function NoComp({ name }: { name: string; }) {
    return (
        <>
            {`${name} component not found in renderRoot -> generateElement`}
        </>
    )
}

function getComponent({ name, compKv }: { name: string; compKv: CompKv; }) {
    return compKv[name]
}

function generateReactElement({
    name,
    compKv,
    key,
    props,
    children,
}: {
    name: string;
    compKv: CompKv;
    key: string;
    props: any;
    children: React.ReactNode;
}) {
    if (getComponent({ name, compKv })) {
        try {
            const Generic: React.FC = getComponent({ name, compKv })
            const Hydrated = React.createElement(
                Generic,
                { key, ...props },
                children
            );

            return Hydrated;
        } catch (error) {
            throw new Error("error in generateReactElement")
        }
    } else {
        return <NoComp key="err-comp" name={name} />
    }
}


// children come in as an array of objects
// we iterate through them recursively and 
// output a react element with react elements for children 
function mapChildren({
    key,
    compKv,
    compData,
}: {
    key: number;
    compKv: CompKv;
    compData: CompData;
}): React.ReactNode {
    let mappedChildren;

    // console.log(JSON.stringify(compData))

    // map children for every child
    const { properties: { descendents = null } } = compData;
    if (descendents) {
        mappedChildren = descendents.map((data: CompData, i: number) => {
            const newKey = key + i;
            return mapChildren({
                key: newKey,
                compKv,
                compData: descendents[i]
            })
        })
    }
    const Hydrated = generateReactElement({
        name: compData.name,
        compKv,
        props: compData.properties,
        key: String(key),
        children: mappedChildren
    })

    return Hydrated;

}

export function renderRoot({
    rootKey = "root-1",
    compKv,
    data,
}: {
    rootKey?: string;
    compKv: CompKv;
    data: CompData[];
}): React.ReactElement {
    // check for children on each component designated in data
    // and recursively add children
    // to Parent components
    // before rendering inside a root component

    // console.log(JSON.stringify(data[0]))
    const mappedChildren = data.map((comp: CompData, i: number) => {
        return mapChildren({
            key: i + 450,
            compKv,
            compData: comp
        })
    })

    //  return Root Component;
    const Hydrated = generateReactElement({
        name: "container",
        compKv,
        props: { id: rootKey },
        key: rootKey,
        children: mappedChildren
    })

    return Hydrated;
}
