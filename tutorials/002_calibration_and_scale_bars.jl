### A JIVEbook.jl notebook ###
# v0.0.2

using Markdown
using InteractiveUtils
using JIVECore
using PlutoPlotly, PlutoUI
import Main.PlutoRunner.JIVECore.Data.image_data as image_data
import Main.PlutoRunner.JIVECore.Data.image_keys as image_keys

# ╔═╡ f699af90-b2a6-49cc-afcd-b90aefcf37f7
using Unitful

# ╔═╡ 2122b7be-b010-4660-989f-73be2367ccce
img = JIVECore.Files.loadImage("/Users/yi/JIVE/Demo Images/Widefield Images/Calcium Flux/Calcium Flux.tif");

# ╔═╡ 8a83fbf3-db5d-4e90-a9fe-55db7db5ce99
JIVECore.Files.showInfo(img)

# ╔═╡ 1423da39-3cb6-44b7-8271-a77b53f5e556
img2 = JIVECore.Data.imCalibrate(img; v= 1u"mm", h= 0.001u"mm", time=1u"s");

# ╔═╡ 628228fa-f12e-4df6-a994-48d04c179f22
println(JIVECore.Data.axisnames(img2))
println(JIVECore.Data.axisvalues(img2))

# ╔═╡ 288f1cda-0195-4356-b3c0-dcf24b6ec4e0
JIVECore.Draw.timestamp!(img2, channels=[:h,:v,:time], fontsize=0.06, corner=:topright)

# ╔═╡ f95ebe26-613c-4c06-b99c-bec1b5a8c745
JIVECore.Draw.scalebar!(img2, .05u"mm", fontsize=0.04, fcolor=(1), channels=[:h,:v], corner=:bottomleft, show_text=true)
# img2

# ╔═╡ 1aa5d44a-7f34-4b07-a5e0-502f67181731
JIVECore.Draw.scalebar!(img2, 50u"mm", direction=:v, fontsize=0.04, fcolor=(1,1,1), channels=[:h,:v], corner=:bottomleft, show_text=true);

# ╔═╡ e519bccb-b23d-4d2d-aa13-f024c6a477b8
JIVECore.Visualize.mosaicview(img2[time=1:3], nrow=1)

# ╔═╡ 00000000-0000-0000-0000-000000000001
PLUTO_PROJECT_TOML_CONTENTS = """
[deps]
Unitful = "1986cc42-f94f-5a68-af5c-568840ba703d"

[compat]
Unitful = "~1.27.0"
"""

# ╔═╡ 00000000-0000-0000-0000-000000000002
PLUTO_MANIFEST_TOML_CONTENTS = """
# This file is machine-generated - editing it directly is not advised

julia_version = "1.11.5"
manifest_format = "2.0"
project_hash = "17429589116d695bb88fd87d339679b35d67f75e"

[[deps.Artifacts]]
uuid = "56f22d72-fd6d-98f1-02f0-08ddc0907c33"
version = "1.11.0"

[[deps.CompilerSupportLibraries_jll]]
deps = ["Artifacts", "Libdl"]
uuid = "e66e0078-7015-5450-92f7-15fbd957f2ae"
version = "1.1.1+0"

[[deps.Dates]]
deps = ["Printf"]
uuid = "ade2ca70-3891-5945-98fb-dc099432e06a"
version = "1.11.0"

[[deps.Libdl]]
uuid = "8f399da3-3557-5675-b5ff-fb832c97cbdb"
version = "1.11.0"

[[deps.LinearAlgebra]]
deps = ["Libdl", "OpenBLAS_jll", "libblastrampoline_jll"]
uuid = "37e2e46d-f89d-539d-b4ee-838fcccc9c8e"
version = "1.11.0"

[[deps.OpenBLAS_jll]]
deps = ["Artifacts", "CompilerSupportLibraries_jll", "Libdl"]
uuid = "4536629a-c528-5b80-bd46-f80d51c5b363"
version = "0.3.27+1"

[[deps.Printf]]
deps = ["Unicode"]
uuid = "de0858da-6303-5e67-8744-51eddeeeb8d7"
version = "1.11.0"

[[deps.Random]]
deps = ["SHA"]
uuid = "9a3f8284-a2c9-5f02-9a11-845980a1fd5c"
version = "1.11.0"

[[deps.SHA]]
uuid = "ea8e919c-243c-51af-8825-aaa63cd721ce"
version = "0.7.0"

[[deps.Unicode]]
uuid = "4ec0a83e-493e-50e2-b9ac-8f72acf5a8f5"
version = "1.11.0"

[[deps.Unitful]]
deps = ["Dates", "LinearAlgebra", "Random"]
git-tree-sha1 = "c25751629f5baaa27fef307f96536db62e1d754e"
uuid = "1986cc42-f94f-5a68-af5c-568840ba703d"
version = "1.27.0"

    [deps.Unitful.extensions]
    ConstructionBaseUnitfulExt = "ConstructionBase"
    ForwardDiffExt = "ForwardDiff"
    InverseFunctionsUnitfulExt = "InverseFunctions"
    LatexifyExt = ["Latexify", "LaTeXStrings"]
    NaNMathExt = "NaNMath"
    PrintfExt = "Printf"

    [deps.Unitful.weakdeps]
    ConstructionBase = "187b0558-2788-49d3-abe0-74a17ed4e7c9"
    ForwardDiff = "f6369f11-7733-5829-9624-2563aa707210"
    InverseFunctions = "3587e190-3f89-42d0-90ee-14403ec27112"
    LaTeXStrings = "b964fa9f-0449-5b57-a5c2-d3ea65f4040f"
    Latexify = "23fbe1c1-3f47-55db-b15f-69d7ec21a316"
    NaNMath = "77ba4419-2d1f-58cd-9bb1-8ffee604a2e3"
    Printf = "de0858da-6303-5e67-8744-51eddeeeb8d7"

[[deps.libblastrampoline_jll]]
deps = ["Artifacts", "Libdl"]
uuid = "8e850b90-86db-534c-a0d3-1478176c7d93"
version = "5.11.0+0"
"""

# ╔═╡ Cell order:
# ╠═2122b7be-b010-4660-989f-73be2367ccce
# ╠═8a83fbf3-db5d-4e90-a9fe-55db7db5ce99
# ╠═f699af90-b2a6-49cc-afcd-b90aefcf37f7
# ╠═1423da39-3cb6-44b7-8271-a77b53f5e556
# ╠═628228fa-f12e-4df6-a994-48d04c179f22
# ╠═288f1cda-0195-4356-b3c0-dcf24b6ec4e0
# ╠═f95ebe26-613c-4c06-b99c-bec1b5a8c745
# ╠═1aa5d44a-7f34-4b07-a5e0-502f67181731
# ╠═e519bccb-b23d-4d2d-aa13-f024c6a477b8
# ╟─00000000-0000-0000-0000-000000000001
# ╟─00000000-0000-0000-0000-000000000002
