<script setup lang="ts">
import { useRouter } from 'vue-router';

import { useCmfx } from '@/pages/app';

const $cmfx = useCmfx();
const $router = useRouter();

$cmfx.logout();
$router.push({name: $cmfx.options.loginPage});
</script>
