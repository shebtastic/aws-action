const core = require('@actions/core');
const { exec } = require('@actions/exec')

;(async () => {
  try {
    let stdout = ""
    await exec("curl", ["--version"])
    await exec("curl", ["https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip", "--output", "awscliv2.zip"])
    await exec("unzip", ["awscliv2.zip"])
    await exec("sudo", ["./aws/install"])
    await exec("rm", ["awscliv2.zip"])
    core.exportVariable("PATH", `${process.env["PATH"]}:${process.cwd()}`)
    await exec("gactions", ["--version"], {
      listeners: {
        stdout: (data) => {
          stdout += data.toString()
        }
      }
    })
    core.info(`installed gactions version: ${stdout}`)
  } catch (error) {
    core.setFailed(error.message);
  }  
})()
