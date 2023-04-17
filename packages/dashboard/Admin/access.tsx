// SPDX-License-Identifier: MIT

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Checkbox, CheckboxGroup, Collapse } from "@douyinfe/semi-ui";

import { AppContext } from '@dashboard/App';

export function GroupAccess() {
    const { id } = useParams();
    const ctx = useContext(AppContext);
    const [resources, setResources] = useState<Array<Resources>>([]);
    const [allowed, setAllowed] = useState<Array<string>>([]);
    const [res, setRes] = useState<Array<string>>([]);

    useEffect(()=>{
        (async ()=>{
            const r = await ctx.get(`/resources`);
            if (!r.ok) {
                console.error(r.problem);
                return;
            }

            setResources((r.body as ResourcesGroup).groups);
        })();

        (async ()=>{
            const r = await ctx.get(`/groups/${id}/resources/allowed`);
            if (!r.ok) {
                console.error(r.problem);
                return;
            }

            setAllowed(r.body as Array<string>);
        })();

        (async ()=>{
            const r = await ctx.get(`/groups/${id}/resources`);
            if (!r.ok) {
                console.error(r.problem);
                return;
            }

            setRes(r.body as Array<string>);
        })();
    });

    const isDisabled = (v: string)=> {return !allowed.includes(v);};

    const collapses = resources.map((v)=>{
        return <Collapse accordion key={v.title}>
            <Collapse.Panel header={v.title} itemKey={v.title}>
                <CheckboxGroup direction="horizontal" value={res}>
                    {
                        v.resources.map((item)=>{
                            return <Checkbox disabled={isDisabled(item.id)} key={item.id} value={item.id}>{item.title}</Checkbox>;
                        })
                    }
                </CheckboxGroup>
            </Collapse.Panel>
        </Collapse>;
    });

    return <div>
        {collapses}
    </div>;
}

interface ResourcesGroup {
    groups: Array<Resources>
}

/**
 * Resources 资源列表
 */
interface Resources {
    title: string
    resources: Array<Resource>
}

interface Resource {
    id: string
    title: string
}
