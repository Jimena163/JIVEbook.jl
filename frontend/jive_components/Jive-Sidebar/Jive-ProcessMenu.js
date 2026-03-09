import { myAccFunc, createCellWithCode, createMDCellWithUI, getVarName, resolveAfterTimeout, updateAllChevrons, closeOtherAccordions } from "./jive_helpers.js"

function createAccordion(title, items, idSuffix) {
    const accButton = document.createElement("button")
    accButton.className = "jv-button jv-block jv-left-align"
    accButton.name = title
    accButton.style.display = "flex"
    accButton.style.justifyContent = "space-between"
    accButton.style.alignItems = "center"
    accButton.style.fontSize = "0.93em"
    accButton.innerHTML = `
        <span style="display:flex;align-items:center;">
            <span>${title}</span>
        </span>
        <img class="chevron" width="15" style="margin-left:auto;" src="https://cdn.jsdelivr.net/gh/ionic-team/ionicons@5.5.1/src/svg/chevron-down-outline.svg" 
            data-down="https://cdn.jsdelivr.net/gh/ionic-team/ionicons@5.5.1/src/svg/chevron-down-outline.svg"
            data-up="https://cdn.jsdelivr.net/gh/ionic-team/ionicons@5.5.1/src/svg/chevron-up-outline.svg">
    `
    const accContent = document.createElement("div")
    accContent.id = "AccProcess_" + idSuffix
    accContent.className = "jv-hide jv-card"
    accContent.style.boxShadow = "none"
    accContent.style.margin = "0px 0px 5px 15px"
    accContent.style.fontSize = "0.92em"

    items.forEach((item) => accContent.appendChild(item))

    accButton.onclick = function () {
        closeOtherAccordions(accContent.id, "AccProcess_")
        myAccFunc(accContent.id)
        updateAllChevrons()
    }

    const wrapper = document.createElement("div")
    wrapper.appendChild(accButton)
    wrapper.appendChild(accContent)
    return wrapper
}

function createMenuItem(text, onclick) {
    const a = document.createElement("a")
    a.href = "#"
    a.className = "jv-bar-item jv-button jv-left-align"
    a.style.fontSize = "0.93em"
    a.style.display = "flex"
    a.style.alignItems = "center"
    a.innerHTML = `<span>${text}</span>`
    a.onclick = onclick
    return a
}

export function createProcessMenu(timeoutValue) {
    // Main Process menu button
    const accButtonProcess = document.createElement("button")
    accButtonProcess.className = "jv-button jv-block jv-left-align"
    accButtonProcess.name = "Process"
    accButtonProcess.style.display = "flex"
    accButtonProcess.style.justifyContent = "space-between"
    accButtonProcess.style.alignItems = "center"
    accButtonProcess.innerHTML = `
        <span style="display:flex;align-items:center;">
            <span style="font-size:0.97em;">Process</span>
        </span>
        <img class="chevron" width="15" style="margin-left:auto;" src="https://cdn.jsdelivr.net/gh/ionic-team/ionicons@5.5.1/src/svg/chevron-down-outline.svg"
            data-down="https://cdn.jsdelivr.net/gh/ionic-team/ionicons@5.5.1/src/svg/chevron-down-outline.svg"
            data-up="https://cdn.jsdelivr.net/gh/ionic-team/ionicons@5.5.1/src/svg/chevron-up-outline.svg">
    `
    accButtonProcess.onclick = function () {
        closeOtherAccordions(accProcess.id)
        myAccFunc(accProcess.id)
        updateAllChevrons()
    }

    // Main Process menu container
    const accProcess = document.createElement("div")
    accProcess.id = "AccProcess"
    accProcess.className = "jv-hide jv-card"
    accProcess.style.boxShadow = "none"
    accProcess.style.margin = "0px 0px 5px 15px"

    // 🧹 Filters
    const filterItems = [
        createMenuItem("Gaussian Blur", function () {}),
        createMenuItem("Median Filter", function () {}),
        createMenuItem("Bilateral Filter", function () {}),
        createMenuItem("Unsharp Mask", function () {}),
        createMenuItem("Edge Detection (Sobel, Canny)", function () {}),
    ]

    // 🧬 Morphology
    const morphItems = [
        createMenuItem("Erode", function () {}),
        createMenuItem("Dilate", function () {}),
        createMenuItem("Open", function () {}),
        createMenuItem("Close", function () {}),
        createMenuItem("Skeletonize", function () {}),
        createMenuItem("Distance Transform", function () {}),
    ]

    // 🔄 Transformations
    const transformItems = [
        createMenuItem("Rotate (90°, 180°, Arbitrary)", function () {}),
        createMenuItem("Flip (Horizontal/Vertical)", function () {}),
        createMenuItem("Crop", function () {}),
        createMenuItem("Resize", function () {}),
        createMenuItem("Translate", function () {}),
        createMenuItem("Perspective Warp", function () {}),
    ]

    // 🔊 Denoising
    const denoiseItems = [
        createMenuItem("Non-local Means", function () {}),
        createMenuItem("Wavelet Denoising", function () {}),
        createMenuItem("Anisotropic Diffusion", function () {}),
        createMenuItem("Total Variation Filter", function () {}),
    ]

    // 🔁 Deconvolution
    const deconvItems = [
        createMenuItem("Richardson-Lucy", async function () {
            const sel_im = getVarName("sel_im")
            const sel_psf = getVarName("sel_psf")
            const iterations = getVarName("iterations")
            const reg = getVarName("reg")
            createMDCellWithUI(
                "Richardson-Lucy Deconvolution",
                `
1. Select image to deconvolve: $(@bind ${sel_im} confirm(Select([nothing, image_keys...])))
1. Select psf: $(@bind ${sel_psf} confirm(Select([nothing, image_keys...]))) 
1. Select # of iterations: $(@bind ${iterations} confirm(NumberField(1:9999, default=1)))
1. Select regularizer: $(@bind ${reg} confirm(Select([nothing => "nothing"])))`
            )
            await resolveAfterTimeout(timeoutValue)
            createCellWithCode(`using FFTW`)
            await resolveAfterTimeout(timeoutValue)
            createCellWithCode(`
if isnothing(${sel_im}) 
    print("Select an image to deconvolve") 
elseif isnothing(${sel_psf}) 
    print("Select a PSF") 
else
    image_data[${sel_psf}*"_match"], _ = JIVECore.Process.imMatching(image_data[${sel_psf}], image_data[${sel_im}], method="replicate", collect_arrays=true);
    image_data[${sel_im}*"_dec"] = JIVECore.Process.deconvRL(JIVECore.Data.im2float(image_data[${sel_im}]), JIVECore.Data.im2float(ifftshift(image_data[${sel_psf}*"_match"])), regularizer=${reg}, iterations=${iterations});
    JIVECore.Visualize.gif(JIVECore.Process.autoContrast(image_data[${sel_im}*"_dec"]))
end`)
        }),
        createMenuItem("Wiener Deconvolution", function () {}),
        createMenuItem("PSF Estimation", function () {}),
        createMenuItem("Blind Deconvolution", function () {}),
    ]

    // Existing items
    const customItems = [
        createMenuItem("Apply Filter", function () {}),
        createMenuItem("Threshold", function () {}),
        createMenuItem("Segment", function () {}),
        createMenuItem("Normalize", function () {}),
        createMenuItem("Calculate Images", async function () {

            const sel_img1 = getVarName("calc_img1");
            const sel_img2 = getVarName("calc_img2");
        
            const sel_c1 = getVarName("calc_c1");
            const sel_c2 = getVarName("calc_c2");
        
            const sel_op = getVarName("calc_op");
            const rem_neg = getVarName("calc_remove_neg");
        
            const calc_key = getVarName("calc_key");
        
            ////////////////////////////////////
            // UI
            ////////////////////////////////////
        
            createMDCellWithUI(
                "Image Calculation",
                `
Image 1:
$(@bind ${sel_img1} Select([nothing, image_keys...]))
        
Channel img1:
$(@bind ${sel_c1} NumberField(1:10, default=1))
        
Image 2:
$(@bind ${sel_img2} Select([nothing, image_keys...]))
        
Channel img2:
$(@bind ${sel_c2} NumberField(1:10, default=1))
        
Operation:
$(@bind ${sel_op} Select(["+", "-", "*", "/"]))
        
Remove negatives:
$(@bind ${rem_neg} CheckBox(default=false))
                `
            );
        
            await resolveAfterTimeout(300);
        
            ////////////////////////////////////
            // Processing
            ////////////////////////////////////
        
            createCellWithCode(`
        
        ${calc_key} = nothing
        
        let
        
        if !isnothing(${sel_img1}) && !isnothing(${sel_img2})
        
            img1_full = image_data[${sel_img1}]
            img2_full = image_data[${sel_img2}]
        
            # --- detectar canal en img1 ---
            if img1_full isa JIVECore.Data.AxisArray && :c in JIVECore.Data.axisnames(img1_full)
                img1 = img1_full[c=${sel_c1}]
            else
                img1 = img1_full
            end
        
            # --- detectar canal en img2 ---
            if img2_full isa JIVECore.Data.AxisArray && :c in JIVECore.Data.axisnames(img2_full)
                img2 = img2_full[c=${sel_c2}]
            else
                img2 = img2_full
            end
        
            # --- operación ---
            if ${sel_op} == "+"
                op = +
            elseif ${sel_op} == "-"
                op = -
            elseif ${sel_op} == "*"
                op = *
            else
                op = /
            end
        
            result = JIVECore.Data.imCalculate(
                img1,
                img2,
                op;
                remove_negatives=${rem_neg}
            )
        
            base_name = string(${sel_img1}, "_", ${sel_op}, "_", ${sel_img2})
        
            key = JIVECore.Data.keyCheck(image_data, base_name)
        
            image_data[key] = result
        
            if !(key in image_keys)
                push!(image_keys, key)
            end
        
            global ${calc_key}
            ${calc_key} = key
        
            println("Stored image: ", key)
            println("Size: ", size(result))
        
        end
        
        end
        
        nothing
        
        `);
        
        }),
    ]

    // Add accordions to menu
    accProcess.appendChild(createAccordion("🧹 Filters", filterItems, "filters"))
    accProcess.appendChild(createAccordion("🧬 Morphology", morphItems, "morphology"))
    accProcess.appendChild(createAccordion("🔄 Transformations", transformItems, "transform"))
    accProcess.appendChild(createAccordion("🔊 Denoising", denoiseItems, "denoise"))
    accProcess.appendChild(createAccordion("🔁 Deconvolution", deconvItems, "deconv"))
    accProcess.appendChild(createAccordion("Custom", customItems, "custom"))

    // Add a line at the end
    const hr = document.createElement("hr")
    hr.style.margin = "12px 0 0 0"
    accProcess.appendChild(hr)

    // Wrap button and menu
    const itemBarProcess = document.createElement("div")
    itemBarProcess.appendChild(accButtonProcess)
    itemBarProcess.appendChild(accProcess)

    return itemBarProcess
}
