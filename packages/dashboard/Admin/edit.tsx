// SPDX-License-Identifier: MIT

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Divider, Form } from "@douyinfe/semi-ui";
import { OptionProps } from "@douyinfe/semi-ui/lib/es/select";

import { AppContext } from "@dashboard/App/context";
import { useLocale } from "@dashboard/locales";
import { AsyncForm } from "@dashboard/AsyncForm";
import { Admin, getSexes, getStates, Group } from './types';
import { sleep, mapToSelectOptions, objectsToSelectOptions } from "@dashboard/utils";

export function Edit() {
    const ctx = useContext(AppContext);
    const nav = useNavigate();
    const locale = useLocale();
    const { id } = useParams();
    const [info, setInfo] = useState<Partial<Admin>>({});
    const [loading, setLoading] = useState(false);
    const sexes = getSexes(locale);
    const states = getStates(locale);
    const [groups, setGroups] = useState<Array<OptionProps>>([]);

    useEffect(()=>{
        load();
    }, []);

    const load = async()=>{
        setLoading(true);

        let r = await ctx.get('/groups');
        if (!r.ok) {
            console.error(r.problem);
            setLoading(false);
            return;
        }
        const gs = r.body as Array<Group>;
        setGroups(objectsToSelectOptions(gs, 'name','id'));

        r = await ctx.get(`/admins/${id}`);
        if (!r.ok) {
            console.error(r.problem);
            setLoading(false);
            return;
        }
        setInfo(r.body as Admin);

        setLoading(false);
    };

    return <div>
        <AsyncForm initValues={info} style={{maxWidth: '550px', margin: 'auto'}} onSubmit={async()=>{await sleep(500);}}>
            <Form.Input label={locale.common.username} field='username' />
            <Form.Input label={locale.common.nickname} field='nickname' />
            <Form.Input label={locale.common.name} field='name' />
            <Form.Select label={locale.common.state} field='state' optionList={mapToSelectOptions(states)} />
            <Form.Select label={locale.common.sex} field='sex' optionList={mapToSelectOptions(sexes)} />
            <Form.Select label={locale.admin.group} field='group' optionList={groups} />
            <Form.Input label={locale.common.avatar} field='avatar' />

            <Divider style={{margin: '10px 0'}} />
            <div className="cmfx-actions">
                <Button htmlType="button" type="tertiary" onClick={()=>nav(-1)}>{locale.common.back}</Button>
                <Button htmlType="submit" type="primary">{locale.common.save}</Button>
            </div>
        </AsyncForm>
    </div>;
}
