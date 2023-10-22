import si from 'systeminformation'

// platform distro serial
si.osInfo()
    .then(s => console.log('osinfo', s))
    .catch(e => console.log(e))

// uuid sku
si.system()
    .then(s => console.log('system', s))
    .catch(e => console.log(e))
